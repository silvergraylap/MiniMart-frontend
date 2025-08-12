import axios from 'axios'

export const getMyPage = () => {
   return axios.get('/mypage', { withCredentials: true })
}

export const updateMyPage = (data) => {
   return axios.patch('/mypage', data, { withCredentials: true })
}

export const deleteAccount = () => {
   return axios.delete('/mypage/account', { withCredentials: true })
}

export const writeReview = (orderId, reviewData) => {
   return axios.post(`/orders/${orderId}/review`, reviewData, { withCredentials: true })
}

export const unfollowSeller = (sellerId) => {
   return axios.delete(`/follow/${sellerId}`, { withCredentials: true })
}
