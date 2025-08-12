import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { writeReviewThunk } from '../../features/mypageSlice'

const OrderHistoryForm = () => {
   const dispatch = useDispatch()
   const { user, loading, error } = useSelector((state) => state.mypage)
   const orders = user?.orders || []

   const handleWriteReview = (orderId) => {
      const reviewContent = window.prompt('리뷰 내용을 입력하세요:')
      if (reviewContent) {
         dispatch(writeReviewThunk({ orderId, reviewData: { content: reviewContent } }))
            .unwrap()
            .then(() => {
               alert('리뷰가 등록되었습니다.')
            })
            .catch((err) => {
               alert(`리뷰 등록 실패: ${err}`)
            })
      }
   }

   return (
      <section className="order-history-section">
         <h2 className="section-title">구매 내역</h2>

         {loading && <p className="loading">로딩 중...</p>}
         {error && <p className="error">에러: {error}</p>}
         {!loading && orders.length === 0 && <p className="empty-text">구매 내역이 없습니다.</p>}

         {!loading && orders.length > 0 && (
            <div className="order-list">
               {orders.map((order) => (
                  <div className="order-item" key={order.id}>
                     <div className="thumb">
                        <img src={order.productImage || '/default-product.png'} alt={order.productName} />
                     </div>
                     <div className="info">
                        <p className="title">{order.productName}</p>
                        <p className="meta">{order.orderDate}</p>
                        <p className="meta">{order.status}</p>
                     </div>
                     <div className="actions">
                        <button className="btn-small primary" onClick={() => handleWriteReview(order.id)} disabled={loading}>
                           리뷰 작성
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </section>
   )
}

export default OrderHistoryForm
