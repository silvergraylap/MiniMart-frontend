import axios from 'axios'
import minimartApi from './axiosApi'
const API_URL = import.meta.env.VITE_API_URL

// 내 정보 + 구매 내역 + 팔로잉 목록 조회
export const getMyPageData = async () => {
   return await minimartApi.get('/mypage')
}

// 내 정보 수정
export const updateMyPageData = async (formData) => {
   return await minimartApi.put('/mypage', formData)
}

// 회원 탈퇴
export const deleteMyAccount = async () => {
   return await minimartApi.delete('/mypage')
}

// 팔로잉 취소 (sellerId: 숫자 or 문자열)
export const unfollowSeller = async (sellerId) => {
   return await minimartApi.post(`/mypage/unfollow/${sellerId}`)
}
