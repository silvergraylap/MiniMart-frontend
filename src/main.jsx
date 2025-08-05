// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../src/store/store'

import '../src/styles/register.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
   // <StrictMode>
   <BrowserRouter>
      <App />
   </BrowserRouter>
   // </StrictMode>
)
