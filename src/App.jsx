import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk, fetchUserInfo } from './features/authSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginKakao from './pages/LoginKakao'
import LoginSuccess from './pages/LoginSuccess'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import React from 'react'

function App() {
   const dispatch = useDispatch()
   const { token } = useSelector((state) => state.auth)

   // 앱 시작 시 토큰이 있으면 사용자 정보 요청
   // 카카오 토큰이 없으면 로컬 로그인이 되어있는가 체크
   useEffect(() => {
      if (token) {
         dispatch(fetchUserInfo())
      } else {
         dispatch(checkAuthStatusThunk())
      }
   }, [dispatch, token])

   return (
      <>
         <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login1" element={<LoginKakao />} />
            <Route path="/login/success" element={<LoginSuccess />} />
         </Routes>
      </>
   )
}

export default App
