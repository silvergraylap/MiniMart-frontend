// src/pages/LoginSuccess.jsx
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken, fetchUserInfoThunk } from '../features/authSlice'

const LoginSuccess = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [searchParams] = useSearchParams()

   useEffect(() => {
      const token = searchParams.get('token')

      if (token) {
         // 1. 토큰을 Redux 상태와 localStorage에 저장
         dispatch(setToken(token))
         // 2. 저장된 토큰을 이용해 사용자 정보를 요청하는 Thunk 실행
         dispatch(fetchUserInfoThunk())
         // 3. 메인 페이지로 이동
         navigate('/')
      } else {
         console.error('로그인 토큰이 없습니다.')
         navigate('/login')
      }
   }, [dispatch, navigate, searchParams])

   return <div>로그인 처리 중...</div>
}

export default LoginSuccess
