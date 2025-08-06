import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginKakao from './pages/LoginKakao'
import LoginSuccess from './pages/LoginSuccess'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import FindPwByEmail from './pages/findPwByEmail'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {
   return (
      <>
         <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login" element={<LoginKakao />} />
            <Route path="/login/success" element={<LoginSuccess />} />
            <Route path="/login/findpassword" element={<FindPwByEmail />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
         </Routes>
      </>
   )
}

export default App
