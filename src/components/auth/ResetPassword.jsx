import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [error, setError] = useState('')
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (newPassword !== confirmPassword) {
         setError('비밀번호가 일치하지 않습니다.')
         return
      }

      try {
         // 비밀번호 재설정 API 호출 (예: /api/auth/reset-password)
         const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
         })

         const data = await res.json()

         if (res.ok) {
            alert('비밀번호가 재설정되었습니다.')
            navigate('/login')
         } else {
            setError(data.message || '비밀번호 재설정에 실패했습니다.')
         }
      } catch (err) {
         console.error(err)
         setError('서버 오류가 발생했습니다.')
      }
   }

   return (
      <form className="reset-form" onSubmit={handleSubmit}>
         <h2>비밀번호 재설정</h2>
         <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
         <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
         {error && <div className="error-message">{error}</div>}
         <button type="submit">비밀번호 재설정</button>
      </form>
   )
}

export default ResetPassword
