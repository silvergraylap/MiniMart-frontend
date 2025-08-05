// src/pages/LoginSuccess.jsx
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function LoginSuccess() {
   const [searchParams] = useSearchParams()
   const token = searchParams.get('token')

   useEffect(() => {
      if (token) {
         localStorage.setItem('jwt', token)
      }
   }, [token])

   return (
      <div>
         <h1>로그인 성공!</h1>
         <p>토큰: {token}</p>
      </div>
   )
}

export default LoginSuccess
