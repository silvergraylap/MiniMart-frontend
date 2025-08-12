//app.jsx에 아직 연결 안함. api 잘 불러오는지 확인
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 실제 주소로 변경 필수
const API_BASE_URL = VITE_API_URL

const maskEmail = (email) => {
   if (!email || !email.includes('@')) return '이메일 정보 오류'
   const [local, domain] = email.split('@')
   return `${local[0]}${'*'.repeat(local.length - 1)}@${domain}`
}

// --- 스타일 객체 (CSS-in-JS) ---
const styles = {
   container: {
      backgroundColor: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
   },
   card: {
      width: '100%',
      maxWidth: '448px',
      padding: '32px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
   },
   h1: {
      fontSize: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1e293b',
      marginBottom: '1rem',
   },
   p: {
      marginBottom: '2rem',
      textAlign: 'center',
   },
   input: {
      width: '100%',
      padding: '12px 16px',
      marginTop: '4px',
      color: '#334155',
      backgroundColor: '#f8fafc',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      boxSizing: 'border-box',
   },
   button: {
      width: '100%',
      padding: '12px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: '#4338ca',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '1rem',
   },
   buttonSecondary: {
      width: '50%',
      padding: '12px',
      fontWeight: '600',
      color: '#334155',
      backgroundColor: '#e2e8f0',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
   },
   buttonGroup: {
      display: 'flex',
      gap: '8px',
      marginTop: '1rem',
   },
}

// --- 페이지 컴포넌트들 ---

function FindPasswordPage() {
   const [step, setStep] = useState(1)
   const [phone, setPhone] = useState('')
   const [email, setEmail] = useState('')
   const [maskedEmail, setMaskedEmail] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [message, setMessage] = useState({ type: '', text: '' })

   // [수정] 전화번호 제출 시, 실제 API를 호출합니다.
   const handlePhoneSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      setMessage({ type: '', text: '' })

      try {
         const response = await fetch(`${API_BASE_URL}/auth/find-by-phone`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phone }),
         })

         const data = await response.json()

         if (response.ok) {
            // API 호출이 성공했을 때
            setMaskedEmail(data.maskedEmail)
            setStep(2)
            setMessage({ type: 'info', text: '회원님의 이메일 정보를 확인했습니다.' })
         } else {
            // API 호출이 실패했을 때
            setMessage({ type: 'error', text: data.message })
         }
      } catch (error) {
         // 네트워크 오류 등
         setMessage({ type: 'error', text: '서버와 통신할 수 없습니다.' })
      } finally {
         setIsLoading(false)
      }
   }

   // [수정] 이메일 제출 시, 실제 API를 호출합니다.
   const handleEmailSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      setMessage({ type: '', text: '' })

      try {
         const response = await fetch(`${API_BASE_URL}/auth/send-reset-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phone, email: email }),
         })

         const data = await response.json()

         if (response.ok) {
            setStep(3) // 다음 단계는 인증 코드 입력 단계가 되어야 합니다.
            setMessage({ type: 'success', text: data.message })
         } else {
            setMessage({ type: 'error', text: data.message })
         }
      } catch (error) {
         setMessage({ type: 'error', text: '서버와 통신할 수 없습니다.' })
      } finally {
         setIsLoading(false)
      }
   }

   const resetProcess = () => {
      setStep(1)
      setPhone('')
      setEmail('')
      setMessage({ type: '', text: '' })
   }

   const messageStyle = {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '8px',
      textAlign: 'center',
      color: 'white',
      display: message.text ? 'block' : 'none',
      backgroundColor: message.type === 'error' ? '#ef4444' : message.type === 'success' ? '#22c55e' : '#3b82f6',
   }

   return (
      <div style={styles.card}>
         <h1 style={styles.h1}>비밀번호 찾기</h1>
         <div style={messageStyle}>{message.text}</div>

         {step === 1 && (
            <form onSubmit={handlePhoneSubmit}>
               <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" style={styles.input} required disabled={isLoading} />
               <button type="submit" style={styles.button} disabled={isLoading}>
                  {isLoading ? '확인 중...' : '이메일 찾기'}
               </button>
            </form>
         )}

         {step === 2 && (
            <form onSubmit={handleEmailSubmit}>
               <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>
                  <p>아래 이메일이 맞는지 확인해주세요.</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0' }}>{maskedEmail}</p>
               </div>
               <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="전체 이메일 주소 입력" style={styles.input} required disabled={isLoading} />
               <div style={styles.buttonGroup}>
                  <button type="button" onClick={resetProcess} style={styles.buttonSecondary} disabled={isLoading}>
                     뒤로
                  </button>
                  <button type="submit" style={{ ...styles.button, width: '50%', marginTop: 0 }} disabled={isLoading}>
                     {isLoading ? '전송 중...' : '재설정 메일 받기'}
                  </button>
               </div>
            </form>
         )}

         {step === 3 && (
            <div style={{ textAlign: 'center' }}>
               <p>성공적으로 요청이 완료되었습니다.</p>
               <button onClick={resetProcess} style={styles.button}>
                  처음으로 돌아가기
               </button>
            </div>
         )}
      </div>
   )
}
