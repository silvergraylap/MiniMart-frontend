import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from './features/authSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginKakao from './pages/LoginKakao'
import LoginSuccess from './pages/LoginSuccess'

function App() {
   const dispatch = useDispatch()
   const token = useSelector((state) => state.auth.token)

   // 앱 시작 시 토큰이 있으면 사용자 정보 요청
   useEffect(() => {
      if (token) {
         dispatch(fetchUserInfo())
      }
   }, [dispatch, token])

   return (
      <>
         <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login1" element={<LoginKakao />} />
            <Route path="/login/success" element={<LoginSuccess />} />
         </Routes>
      </>
   )
}

export default App
