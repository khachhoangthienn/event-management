import pandas as pd
import psycopg2
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime
import schedule
import time

#Connect db
def connect_to_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="eventDB",
            user="postgres",
            password="root",
            port="5432"
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {str(e)}")
        return None

#get data from database
def fetch_data():
    conn = connect_to_db()
    if conn is None:
        return None, None
    
    cursor = conn.cursor()
    
    #Get users
    cursor.execute("""
        SELECT u.user_id, e.event_id 
        FROM "user" u
        JOIN invoice i ON u.user_id = i.user_user_id
        JOIN package_price pp ON i.package_price_package_id = pp.package_id
        JOIN event e ON pp.event_event_id = e.event_id
        WHERE u.role = 'ATTENDEE'
    """)
    
    user_event_data = cursor.fetchall()
    
    #Get events
    cursor.execute("""
        SELECT e.event_id
        FROM event e
        WHERE e.start_time > NOW() AND e.event_status = 'APPROVED'
    """)
    
    upcoming_events = cursor.fetchall()
    
    #Get about types
    # cursor.execute("""
    #     SELECT e.event_id, string_agg(t.type_name, ',') as event_types
    #     FROM event e
    #     JOIN event_types et ON e.event_id = et.event_event_id
    #     JOIN type t ON et.types_type_id = t.type_id
    #     GROUP BY e.event_id
    # """)
    
    # event_types = cursor.fetchall()
    
    #Get ratings if existed
    cursor.execute("""
        SELECT r.user_user_id, r.event_event_id, r.rating
        FROM review r
    """)
    
    ratings = cursor.fetchall()
    
    cursor.close()
    conn.close()
    return user_event_data, upcoming_events, ratings

#Create matrix
def create_user_item_matrix(user_event_data, ratings=None):
    #Create dataframe
    df = pd.DataFrame(user_event_data, columns=['user_id', 'event_id'])
    
    #if rating existed add it into dataframe
    if ratings and len(ratings) > 0:
        rating_df = pd.DataFrame(ratings, columns=['user_id', 'event_id', 'rating'])

        # Merge
        df = df.merge(rating_df, on=['user_id', 'event_id'], how='left')
        df.fillna({'rating': 1.0}, inplace=True)
    else:
        #If not existed => default = 1
        df['rating'] = 1.0
    
    #Create matrix user - event with value = ratings
    user_item_matrix = df.pivot_table(
        index='user_id', 
        columns='event_id', 
        values='rating', 
        fill_value=0
    )
    
    return user_item_matrix

#similary
def calculate_user_similarity(user_item_matrix):
    #Calc similarity between attendee
    user_similarity = cosine_similarity(user_item_matrix)
    user_similarity_df = pd.DataFrame(
        user_similarity,
        index=user_item_matrix.index,
        columns=user_item_matrix.index
    )
    return user_similarity_df

# Create recommend for user
def generate_recommendations(user_id, user_similarity_df, user_item_matrix, upcoming_events, top_n=6):
    if user_id not in user_similarity_df.index:
        return []  #If user isn't join any events return empty array
    
    #Get user similar with current user
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)
    similar_users = similar_users.drop(user_id)  #Discard current user
    
    #Transfer upcoming event => DataFrame
    upcoming_df = pd.DataFrame(upcoming_events, 
                             columns=['event_id'])
    
    #Get events current user joined
    user_events = user_item_matrix.loc[user_id]
    user_events = user_events[user_events > 0].index.tolist()
    
    #Create Dataframe include recommend events
    #upcoming events => discard events candidate_joined = isn't join
    candidate_events = upcoming_df[upcoming_df['event_id'].isin(
        set(upcoming_df['event_id']) - set(user_events)
    )]

    
    if candidate_events.empty:
        return []
    
    #Calc recommend similar for events
    recommendations = {}
    
    #Get top similar users
    top_similar_users = similar_users.head(10).index.tolist()
    
    #loop events and plus score to calc similar
    for event_id in candidate_events['event_id']:
        score = 0
        for sim_user in top_similar_users:
            #Check if similar user join this event
            if event_id in user_item_matrix.columns and user_item_matrix.loc[sim_user, event_id] > 0:
                #Plus into total score
                score += similar_users[sim_user] * user_item_matrix.loc[sim_user, event_id]
        
        if score > 0:
            recommendations[event_id] = score
    
    #Ordering
    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    
    #get top recommendations
    top_recommendations = [rec[0] for rec in sorted_recommendations[:top_n]]
    
    #details information recommend events upcoming
    recommended_events = upcoming_df[upcoming_df['event_id'].isin(top_recommendations)]
    
    #Add into result
    result = []
    for event_id in top_recommendations:
        event_info = recommended_events[recommended_events['event_id'] == event_id].iloc[0].to_dict()
        weight = recommendations[event_id]
        event_info['weight'] = round(weight, 4)
        result.append(event_info)
    
    return result

#Save into database
def save_recommendations_to_db(recommendations_data):
    conn = connect_to_db()
    if conn is None:
        return
    
    cursor = conn.cursor()
    
    try:
        #Delete old recommendation
        cursor.execute("DELETE FROM recommendation")
        
        #Add new
        for user_id, event_recommendations in recommendations_data.items():
            for rec in event_recommendations:
                cursor.execute("""
                    INSERT INTO recommendation (recommendation_id, user_user_id, event_event_id, weight, created_at, updated_at)
                    VALUES (gen_random_uuid(), %s, %s, %s, NOW(), NOW())
                """, (user_id, rec['event_id'], float(rec['weight'])))
        
        conn.commit()
        print(f"Saved recommendations for {len(recommendations_data)} users")
    except Exception as e:
        conn.rollback()
        print(f"Error saving recommendations: {str(e)}")
    finally:
        cursor.close()
        conn.close()

#Running code
def run_recommendation_system():
    print("Running recommendation system at", datetime.now())
    
    #Get db
    user_event_data, upcoming_events, ratings = fetch_data()
    
    if not user_event_data or not upcoming_events:
        print("No data available")
        return
    
    #Create matrix
    user_item_matrix = create_user_item_matrix(user_event_data, ratings)
    
    if user_item_matrix.empty:
        print("Empty user-item matrix")
        return
    
    #Clc similarity
    user_similarity_df = calculate_user_similarity(user_item_matrix)
    print(user_item_matrix)
    
    #Recommend
    all_recommendations = {}
    for user_id in user_item_matrix.index:
        recommendations = generate_recommendations(
            user_id, user_similarity_df, user_item_matrix, upcoming_events
        )
        if recommendations:
            all_recommendations[user_id] = recommendations
    
    #Save into DB
    save_recommendations_to_db(all_recommendations)

#Schedule => 0h00
def schedule_recommendation_updates():
    # schedule.every().day.at("00:00").do(run_recommendation_system)
    
    #run first
    run_recommendation_system()
    
    # #run follow schedule
    # while True:
    #     schedule.run_pending()
    #     time.sleep(60)

if __name__ == "__main__":
    schedule_recommendation_updates()