import React from 'react'
import './FollowList.css'

const FollowList = ({ followings }) => {
   if (!followings || followings.length === 0) {
      return <div className="follow-empty">팔로잉한 판매자가 없습니다.</div>
   }

   return (
      <div className="follow-list">
         {followings.map((seller) => (
            <div key={seller.seller_id} className="follow-card">
               <img src={seller.seller_profile_img || '/default-seller.png'} alt={seller.seller_name} className="follow-profile-img" />

               <div className="follow-info">
                  <div className="follow-name">{seller.seller_name}</div>
               </div>

               <button className="unfollow-button">팔로우 취소</button>
            </div>
         ))}
      </div>
   )
}

export default FollowList
