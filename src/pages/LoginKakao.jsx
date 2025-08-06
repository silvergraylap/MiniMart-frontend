import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKakaoLoginUrl } from '../features/authSlice'

function LoginPage() {
   const dispatch = useDispatch()
   const { loginUrl, loading } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(getKakaoLoginUrl())
   }, [dispatch])

   if (loading) return <div>로딩 중...</div>
   console.log(loginUrl)

   return (
      <div>
         <h1>로그인 페이지</h1>
         {loginUrl && (
            <a href={loginUrl}>
               <img src="kakao_login_small.png" alt="카카오 로그인" />
            </a>
         )}
      </div>
   )
}

export default LoginPage
