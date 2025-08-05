import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginKakao from './pages/LoginKakao'
import LoginSuccess from './pages/LoginSuccess'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
   return (
      <>
         <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login" element={<LoginKakao />} />
            <Route path="/login/success" element={<LoginSuccess />} />
         </Routes>
      </>
   )
}

export default App
