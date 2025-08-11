import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mypage.css'
import { getMyPageData, updateMyPageData, unfollowSeller, deleteMyAccount } from '../api/mypageApi'

const MyPage = () => {
   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState(null)
   const [orders, setOrders] = useState([])
   const [followings, setFollowings] = useState([])
   const [error, setError] = useState(null)
   const [editMode, setEditMode] = useState(false)
   const [form, setForm] = useState({ name: '', phone_number: '', address: '' })

   const navigate = useNavigate()

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
         setError(null)
         try {
            const res = await getMyPageData()
            const userData = res.data?.data?.user
            const ordersData = res.data?.data?.orders || []
            const followingsData = res.data?.data?.followings || []

            if (!userData) {
               throw new Error('유저 데이터를 불러올 수 없습니다.')
            }

            setUser(userData)
            setOrders(ordersData)
            setFollowings(followingsData)
            setForm({
               name: userData.name || '',
               phone_number: userData.phone_number || '',
               address: userData.address || '',
            })
         } catch (err) {
            setError(err.message || '알 수 없는 오류가 발생했습니다.')
         } finally {
            setLoading(false)
         }
      }
      fetchData()
   }, []) // token 의존성 제거, 최초 마운트 시 1회 실행

   // 내 정보 수정 모드 토글
   const toggleEditMode = () => {
      if (editMode && user) {
         // 수정 모드 해제 시 폼 초기화
         setForm({
            name: user.name || '',
            phone_number: user.phone_number || '',
            address: user.address || '',
         })
      }
      setEditMode(!editMode)
   }

   // 입력값 변경 처리
   const handleChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   // 저장 버튼 클릭 (내 정보 수정)
   const handleSave = async () => {
      try {
         const res = await updateMyPageData(form)
         // 서버 응답 데이터 구조에 따라 경로 맞춤
         const updatedUser = res.data?.user || res.data?.data?.user
         if (!updatedUser) {
            alert('서버 응답이 올바르지 않습니다.')
            return
         }
         setUser(updatedUser)
         setEditMode(false)
         alert('회원 정보가 수정되었습니다.')
      } catch (err) {
         alert(err.response?.data?.message || '회원 정보 수정에 실패했습니다.')
      }
   }

   // 회원 탈퇴 처리
   const handleDeleteAccount = async () => {
      if (!window.confirm('정말 회원 탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

      try {
         await deleteMyAccount()
         localStorage.removeItem('token')
         // 필요시 전역 로그인 상태 초기화 작업도 여기에 추가
         alert('회원 탈퇴가 완료되었습니다.')
         navigate('/login')
      } catch (err) {
         alert(err.response?.data?.message || '회원 탈퇴에 실패했습니다.')
      }
   }

   // 팔로잉 취소
   const cancelFollowing = async (sellerId) => {
      try {
         await unfollowSeller(sellerId)
         setFollowings((prev) => prev.filter((s) => s.seller_id !== sellerId))
      } catch {
         alert('팔로잉 취소 실패')
      }
   }

   if (loading) return <div className="loading">로딩 중...</div>
   if (error) return <div className="error">에러: {error}</div>
   if (!user) return null

   return (
      <div className="mypage-container">
         {/* 프로필 섹션 */}
         <section className="user-info-box">
            <div className="user-info-left">
               <img src={user.profile_img || '/images/default-profile.png'} alt="프로필 이미지" className="user-profile-img" />
               {/* 프로필 이미지 변경 버튼 추가 가능 */}
            </div>
            <div className="user-info-right">
               <div className="user-field">
                  <label>이름</label>
                  {editMode ? <input type="text" name="name" value={form.name} onChange={handleChange} className="editable-input" /> : <input type="text" value={user.name || ''} readOnly />}
               </div>
               <div className="user-field">
                  <label>전화번호</label>
                  {editMode ? <input type="text" name="phone_number" value={form.phone_number} onChange={handleChange} className="editable-input" /> : <input type="text" value={user.phone_number || ''} readOnly />}
               </div>
               <div className="user-field">
                  <label>이메일</label>
                  <input type="email" value={user.email || ''} readOnly />
               </div>
               <div className="user-field user-address-box">
                  <label>주소</label>
                  {editMode ? <input type="text" name="address" value={form.address} onChange={handleChange} className="editable-input user-address-input" /> : <input type="text" value={user.address || ''} className="user-address-input" readOnly />}

                  {!editMode ? (
                     <button className="address-edit-button" onClick={toggleEditMode}>
                        수정
                     </button>
                  ) : (
                     <>
                        <button className="address-edit-button" onClick={handleSave}>
                           저장
                        </button>
                        <button className="address-edit-button" onClick={toggleEditMode}>
                           취소
                        </button>
                     </>
                  )}

                  <button className="withdraw-button" onClick={handleDeleteAccount}>
                     탈퇴하기
                  </button>
               </div>
            </div>
         </section>

         {/* 구매내역 섹션 */}
         <section className="order-list-section">
            <h2 className="order-list-title">구매 내역</h2>
            {orders.length === 0 ? (
               <p>구매 내역이 없습니다.</p>
            ) : (
               orders.map(({ order_id, product_name, product_image, order_date, status }) => (
                  <div className="order-item" key={order_id}>
                     <img src={product_image || '/images/default-product.png'} alt={product_name} />
                     <div className="order-item-info">
                        <p className="order-item-name">{product_name}</p>
                        <p className="order-item-date">주문일: {order_date}</p>
                        <p className="order-item-status">{status}</p>
                     </div>
                     <div className="order-item-actions">
                        <button className="order-action-button">리뷰쓰기</button>
                     </div>
                  </div>
               ))
            )}
         </section>

         {/* 팔로잉 목록 섹션 */}
         <section className="following-list-section">
            <h2 className="following-list-title">팔로잉한 판매자</h2>
            {followings.length === 0 ? (
               <p>팔로잉한 판매자가 없습니다.</p>
            ) : (
               <div className="following-list">
                  {followings.map(({ seller_id, seller_name, seller_profile_img }) => (
                     <div key={seller_id} className="following-item">
                        <img src={seller_profile_img || '/images/default-profile.png'} alt={seller_name} className="following-thumbnail" />
                        <div className="following-nickname">{seller_name}</div>
                        <button className="unfollow-button" onClick={() => cancelFollowing(seller_id)}>
                           팔로잉 취소
                        </button>
                     </div>
                  ))}
               </div>
            )}
         </section>
      </div>
   )
}

export default MyPage
