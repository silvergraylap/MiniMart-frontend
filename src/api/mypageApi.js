import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const getAuthHeader = () => ({
   Authorization: `Bearer ${localStorage.getItem('token')}`,
})

// 내 정보 + 주문 내역 + 팔로잉 목록 조회
export const getMyPageData = () => {
   return axios.get(`${API_URL}/mypage`, {
      headers: getAuthHeader(),
   })
}

// 내 정보 수정
export const updateMyPageData = (data) => {
   return axios.patch(`${API_URL}/mypage/edit`, data, {
      headers: getAuthHeader(),
   })
}

export const deleteMyAccount = () => {
   return axios.delete(`${API_URL}/mypage/delete`, {
      headers: getAuthHeader(),
   })
}

// 팔로잉 취소
export const unfollowSeller = (sellerId) => {
   return axios.delete(`${API_URL}/mypage/followings/${sellerId}`, {
      headers: getAuthHeader(),
   })
}
