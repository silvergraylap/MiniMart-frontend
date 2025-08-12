import { useState } from 'react'
import '../styles/registerSeller.css'

function RegisterSeller() {
   const [address, setAddress] = useState('')
   const [detailAddress, setDetailAddress] = useState('')
   const [postcode, setPostcode] = useState('')
   const [extraAddress, setExtraAddress] = useState('')

   const handleRegister = () => {
      if (!email || !address || !password || !confirmPassword) {
         alert('모든 필드를 입력해주세요!')
         return
      }

      dispatch(
         registerUserThunk({
            address: `${address} ${detailAddress} ${extraAddress}`,
         })
      )
         .unwrap()
         .then(() => setIsRegisterComplete(true))
         .catch((err) => console.error('회원가입 에러:', err))
   }

   return (
      <div className="register-container">
         <img className="logo" src="/Logo.png" alt="미니 로고" />

         <div className="register-input">
            <label>사업자 등록번호</label>
            <input type="text" placeholder="XXXX-XXXX-XXXX" />
         </div>

         <div className="register-input">
            <label>사본 업로드</label>
            <input type="img" placeholder="※ 사업자등록증 사본을 업로드 하지 않은 경우 세금계산서 발급이 되지 않습니다." />
         </div>

         <div className="register-input">
            <label>상호법인명</label>
            <input type="text" placeholder="(주)Minimart" />
         </div>

         <div className="register-input">
            <label>회사 소개</label>
            <input type="text" placeholder="어떤 회사인가요?" />
         </div>

         <div className="register-input">
            <label htmlFor="phone">대표 번호</label>
            <input type="text" placeholder="010-XXXX-XXXX" />
         </div>

         <div className="register-input">
            <label>대표자 명</label>
            <input type="text" placeholder="대표자명 입력" />
         </div>

         <div className="register-input">
            <label>대표 판매 물품</label>
            <input type="text" placeholder="종목" />
         </div>

         <div className="register-input">
            <label>사업장 주소</label>
            <div className="postcode-box">
               <input
                  type="text"
                  className="postcode-box"
                  value={postcode}
                  maxLength={5}
                  onChange={(e) => {
                     const onlyNums = e.target.value.replace(/\D/g, '') // 숫자만
                     setPostcode(onlyNums)
                  }}
                  placeholder="우편번호 입력"
               />
               <button className="postcode-button">우편번호 찾기</button>
            </div>
         </div>

         <div className="register-input">
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소" />
         </div>

         <div className="address-detail-row">
            <div className="half-input">
               <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세주소" />
            </div>
            <div className="half-input">
               <input type="text" value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} placeholder="참고항목" />
            </div>
         </div>

         <div className="button-group">
            <button onClick={handleRegister}>판매자 신청하기</button>
         </div>
      </div>
   )
}

export default RegisterSeller
