import React from 'react'
import './OrderList.css'

const OrderList = ({ orders }) => {
   if (!orders || orders.length === 0) {
      return <div className="order-empty">주문 내역이 없습니다.</div>
   }

   return (
      <div className="order-list">
         {orders.map((order) => (
            <div key={order.order_id} className="order-card">
               <img src={order.product_image || '/default-product.png'} alt={order.product_name} className="order-image" />

               <div className="order-info">
                  <div className="order-name">{order.product_name}</div>
                  <div className="order-date">주문일: {order.order_date}</div>
                  <div className="order-status">상태: {order.status}</div>
               </div>

               {/* 선택적 기능: 리뷰쓰기 버튼 (조건에 따라 나중에 추가 가능) */}
               {/* <button className="order-button">리뷰쓰기</button> */}
            </div>
         ))}
      </div>
   )
}

export default OrderList
