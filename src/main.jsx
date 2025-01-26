import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext'
import UserContextProvider from './context/UserContext'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)
