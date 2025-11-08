import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudentProvider } from './components/StudentContext.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ThemeContextProvider from './contexts/themeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StudentProvider>
   <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
  </StudentProvider>
  </BrowserRouter>
)
