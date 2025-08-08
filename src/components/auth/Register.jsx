import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import '../../styles/register.css'

function Register() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [postcode, setPostcode] = useState('')
   const [address, setAddress] = useState('')
   const [detailAddress, setDetailAddress] = useState('')
   const [extraAddress, setExtraAddress] = useState('')
   const [isRegisterComplete, setIsRegisterComplete] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
   const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)

   const handleRegister = () => {
      if (!email || !address || !password || !confirmPassword) {
         alert('모든 필드를 입력해주세요!')
         return
      }

      if (!validateEmail(email)) {
         alert('유효한 이메일 주소를 입력해주세요!')
         return
      }

      if (!validatePassword(password)) {
         alert('비밀번호는 8자리 이상이고, 영문자와 특수문자를 포함해야 합니다!')
         return
      }

      if (password !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }

      dispatch(
         registerUserThunk({
            email,
            password,
            address: `${address} ${detailAddress} ${extraAddress}`,
         })
      )
         .unwrap()
         .then(() => setIsRegisterComplete(true))
         .catch((err) => console.error('회원가입 에러:', err))
   }

   if (isRegisterComplete) {
      return (
         <div className="register-complete-box">
            <h2>회원가입이 완료되었습니다!</h2>
            <p>로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.</p>
            <button onClick={() => navigate('/login')} className="register-complete-button">
               로그인 하러 가기
            </button>
         </div>
      )
   }

   return (
      <div className="register-container">
         <h2>회원가입</h2>
         {error && <p className="register-error">{error}</p>}

         <div className="register-input">
            <label>이름</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력해주세요" />
         </div>

         <div className="register-input">
            <label>이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" />
         </div>

         <div className="register-input">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8자리 이상, 특수문자 포함" />
         </div>

         <div className="register-input">
            <label>비밀번호 확인</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
         </div>

         <div className="register-input">
            <label htmlFor="birthYear">출생년도</label>
            <select id="birthYear" name="birthYear" className="birthyear-select">
               {Array.from({ length: 2025 - 1899 + 1 }, (_, i) => {
                  const year = 2025 - i
                  return (
                     <option key={year} value={year}>
                        {year}
                     </option>
                  )
               })}
            </select>
         </div>

         <div className="register-input">
            <label htmlFor="phone">전화번호</label>
            <input
               type="tel"
               id="phone"
               name="phone"
               className="phone-input"
               placeholder="01012345678"
               maxLength="11"
               onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, '')
                  e.target.value = onlyNums
               }}
            />
         </div>

         <div className="register-input">
            <label>우편번호</label>
            <div className="postcode-box">
               <input type="tel" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="우편번호 입력" readOnly />
               <button className="postcode-button">우편번호 찾기</button>
            </div>
         </div>

         <div className="register-input">
            <label>주소</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소" />
         </div>

         <div className="address-detail-row">
            <div className="half-input">
               <label>상세주소</label>
               <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세주소" />
            </div>
            <div className="half-input">
               <label>참고항목</label>
               <input type="text" value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} placeholder="참고항목" />
            </div>
         </div>

         <div className="register-sns">
            <p className="sns-label">다른 방법으로 회원가입하기</p>
            <div className="sns-icons">
               <img src="/icons/kakao-icon.png" alt="카카오 로그인" />
               <img src="/icons/google-icon.png" alt="구글 로그인" />
            </div>
         </div>

         <div className="button-group">
            <button onClick={handleRegister} disabled={loading}>
               {loading ? '가입 중...' : '회원가입 완료'}
            </button>
         </div>

         <div className="seller-switch">
            <p onClick={() => navigate('/seller-register')}>저는 판매자입니다</p>
         </div>
      </div>
   )
}

export default Register
