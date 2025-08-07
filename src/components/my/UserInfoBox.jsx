import React from 'react'
import './UserInfoBox.css'

const UserInfoBox = ({ user }) => {
   const [isEditing, setIsEditing] = useState(false)
   const [address, setAddress] = useState(user.address || '')

   const handleEditClick = () => {
      setIsEditing(true)
   }

   const handleSaveClick = () => {
      console.log('저장할 주소:', address)
      setIsEditing(false)
   }

   return (
      <div className="user-info-box">
         <div className="user-info-left">
            <img src={user.profile_img || '/default-profile.png'} alt="프로필 이미지" className="user-profile-img" />
         </div>

         <div className="user-info-right">
            <div className="user-field">
               <label>이름</label>
               <div className="user-value">{user.name}</div>
            </div>

            <div className="user-field">
               <label>전화번호</label>
               <div className="user-value">{user.phone_number}</div>
            </div>

            <div className="user-field">
               <label>이메일</label>
               <div className="user-value">{user.email}</div>
            </div>

            <div className="user-field">
               <label>주소</label>
               <div className="user-address-box">
                  <input type="text" className="user-address-input" value={address} readOnly={!isEditing} onChange={(e) => setAddress(e.target.value)} />
                  {!isEditing ? (
                     <button className="address-edit-button" onClick={handleEditClick}>
                        수정
                     </button>
                  ) : (
                     <button className="address-edit-button" onClick={handleSaveClick}>
                        저장
                     </button>
                  )}
               </div>
            </div>

            <div className="user-buttons">
               <button className="withdraw-button">회원 탈퇴</button>
            </div>
         </div>
      </div>
   )
}

export default UserInfoBox
