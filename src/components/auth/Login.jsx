import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import '../../styles/register.css'

function Login() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading, error } = useSelector((state) => state.auth)

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      const { email, password } = formData
      if (!email || !password) {
         alert('이메일과 비밀번호를 모두 입력해주세요.')
         return
      }

      const resultAction = await dispatch(loginUserThunk({ email, password }))

      if (loginUserThunk.fulfilled.match(resultAction)) {
         navigate('/')
      }
      // 실패 시 error는 useSelector로 출력 (아래 렌더링 참고)
   }

   const handleGoogleLogin = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`
   }

   return (
      <div className="login-container">
         <form className="login-form-box" onSubmit={handleSubmit}>
            <h2 className="login-title">로그인</h2>

            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일" className="login-input" />

            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호" className="login-input" />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit-btn" disabled={isLoading}>
               {isLoading ? '로그인 중...' : '로그인'}
            </button>

            <div className="login-divider">다른 방법으로 로그인하기</div>

            <div className="social-login-icons">
               <img src="/icons/kakao.png" alt="카카오 로그인" className="social-icon" />
               <img src="/icons/google.png" alt="구글 로그인" className="social-icon" onClick={handleGoogleLogin} />
            </div>
         </form>
      </div>
   )
}

export default Login
