import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import '../styles/mypage'

import UserInfoBox from '../components/my/UserInfoBox'
import OrderList from '../components/my/OrderList'
import FollowList from '../components/my/FollowList'

const Mypage = () => {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchMypageData = async () => {
         try {
            const res = await axios.get('/mypage', {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            })
            setData(res.data.data)
         } catch (err) {
            console.error(err)
            setError('데이터를 불러오는 중 오류가 발생했습니다.')
         } finally {
            setLoading(false)
         }
      }

      fetchMypageData()
   }, [])

   if (loading) return <div className="mypage-loading">로딩 중...</div>
   if (error) return <div className="mypage-error">{error}</div>
   if (!data) return null

   return (
      <div className="mypage-container">
         <UserInfoBox user={data.user} />
         <OrderList orders={data.orders} />
         <FollowList followings={data.followings} />
      </div>
   )
}

export default Mypage
