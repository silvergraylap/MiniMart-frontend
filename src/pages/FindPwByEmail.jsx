import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/register.css'

const FindPwByEmail = () => {
   const [email, setEmail] = useState('')
   const [code, setCode] = useState('')
   const [error, setError] = useState('')
   const [isVerfied, setIsVerfied] = useState(false)
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const navigate = useNavigate()

   // 이메일 인증코드 요청
   const handleRequestCode = async () => {
      try {
         const res = await axios.post('/api/auth/local/send-email-code', { email })

         if (res.data.success) {
            alert('인증 코드가 이메일로 전송되었습니다.')
         } else {
            alert('이메일 전송에 실패했습니다.')
         }
      } catch (error) {
         console.error(error)
         alert('서버에서 오류가 발생했습니다.')
      }
   }

   // 인증코드 확인
   const handleVerify = async () => {
      if (!email || !authCode) {
         setMessage('이메일과 인증코드를 모두 입력하세요.')
         return
      }

      try {
         const response = await axios.post('/api/auth/verify-code', {
            email,
            code: authCode,
         })

         if (response.data.success) {
            setMessage('인증이 완료되었습니다. 새 비밀번호를 입력하세요.')
            setIsVerfied(true)
         } else {
            setMessage('인증코드가 올바르지 않습니다.')
         }
      } catch (err) {
         console.error(err)
         alert('서버 오류로 인증에 실패했습니다.')
      }
   }
   navigate('/reset-password')

   // 비밀번호 재설정
   const handleResetPassword = async () => {
      if (newPassword !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다.')
         return
      }
      try {
         const res = await axios.post('/api/auth/local/reset-password', {
            email,
            newPassword,
         })

         if (res.data.success) {
            alert('비밀번호가 성공적으로 변경되었습니다.')
            navigate('/login')
         } else {
            alert('비밀번호 변경에 실패했습니다.')
         }
      } catch (error) {
         console.error(err)
         alert('서버 오류가 발생했습니다.')
      }
   }

   return (
      <div className="find-password-container">
         <h2>비밀번호 찾기</h2>

         <input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
         <button onClick={handleRequestCode}>인증코드 발송</button>

         <input type="text" placeholder="인증코드 입력" value={code} onChange={(e) => setCode(e.target.value)} />
         <button onClick={handleVerify}>인증 확인</button>

         {isVerified && (
            <div className="reset-form">
               <h3>비밀번호 재설정</h3>
               <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
               <input type="password" placeholder="새 비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
               <button onClick={handleResetPassword}>비밀번호 재설정</button>
            </div>
         )}
      </div>
   )
}

export default FindPwByEmail
