import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Findphone from './pages/Findphone.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <App />
      <Findphone />
   </StrictMode>
)
