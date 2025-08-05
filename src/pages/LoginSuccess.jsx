import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setToken, fetchUserInfo } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginSuccess() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (token) {
         dispatch(setToken(token))
         dispatch(fetchUserInfo()).then(() => {
            navigate('/')
         })
      }
   }, [dispatch, navigate])

   return <div>로그인 처리 중...</div>
}
