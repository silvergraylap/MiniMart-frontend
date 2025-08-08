import React from 'react'
// import '../styles/mypage'

const OrderList = ({ orders }) => {
   const [orderData, setOrderData] = useState([])
   useEffect(() => {
      if (orders.length > 0) {
         setOrderData(orders)
      } else {
         // 어떻게나오나임시로만든주문내역이니제출시꼭삭제
         setOrderData([
            {
               id: 1,
               product_img: '/sample-item.png',
               product_name: '샘플 상품 1',
               order_date: '2025-08-01',
               status: '배송완료',
            },
            {
               id: 2,
               product_img: '/sample-item.png',
               product_name: '샘플 상품 2',
               order_date: '2025-07-28',
               status: '배송중',
            },
         ])
      }
   }, [orders])
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
