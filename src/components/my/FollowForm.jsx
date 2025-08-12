import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unfollowSellerThunk } from '../../features/mypageSlice'

const FollowForm = () => {
   const dispatch = useDispatch()
   const { user, loading, error } = useSelector((state) => state.mypage)
   const followings = user?.followings || []

   const handleUnfollow = (sellerId) => {
      if (window.confirm('팔로잉을 취소하시겠습니까?')) {
         dispatch(unfollowSellerThunk(sellerId))
            .unwrap()
            .then(() => {
               alert('팔로잉이 취소되었습니다.')
            })
            .catch((err) => {
               alert(`취소 실패: ${err}`)
            })
      }
   }

   return (
      <section className="following-sellers-section">
         <h2 className="section-title">팔로잉한 판매자</h2>

         {loading && <p className="loading">로딩 중...</p>}
         {error && <p className="error">에러: {error}</p>}
         {!loading && followings.length === 0 && <p className="empty-text">팔로잉한 판매자가 없습니다.</p>}

         {!loading && followings.length > 0 && (
            <div className="following-list">
               {followings.map((seller) => (
                  <div className="following-item" key={seller.id}>
                     <img className="following-thumbnail" src={seller.thumbnail || '/default-seller.png'} alt={seller.nickname} />
                     <p className="following-nickname">{seller.nickname}</p>
                     <button className="unfollow-button" onClick={() => handleUnfollow(seller.id)} disabled={loading}>
                        팔로잉 취소
                     </button>
                  </div>
               ))}
            </div>
         )}
      </section>
   )
}

export default FollowForm
