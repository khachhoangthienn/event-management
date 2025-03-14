import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext'
import UserContextProvider from './context/UserContext'
import EventContextProvider from './context/EventContext'
import NotificationContextProvider from './context/NotificationContext'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <UserContextProvider>
        <EventContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </EventContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)
