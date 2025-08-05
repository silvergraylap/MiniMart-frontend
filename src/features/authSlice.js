import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 로그인된 사용자 정보 가져오기
export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (_, { getState }) => {
   const token = getState().auth.token
   const res = await axios.get('http://localhost:8000/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
   })
   console.log('카카오 사용자 정보:', res)
   return res.data
})

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = createAsyncThunk('auth/getKakaoLoginUrl', async () => {
   const res = await axios.get('http://localhost:8000/auth/kakao')
   return res.data.url
})

const initialState = {
   token: localStorage.getItem('token') || null, // 앱 로드 시 localStorage에서 토큰 불러오기
   loginUrl: '',
   user: null,
   loading: false,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setToken: (state, action) => {
         state.token = action.payload
         localStorage.setItem('token', action.payload) // 토큰 저장
      },
      // 로그아웃시 토큰 삭제
      logout: (state) => {
         state.token = null
         state.user = null
         localStorage.removeItem('token') // 토큰 삭제
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getKakaoLoginUrl.pending, (state) => {
            state.loading = true
         })
         .addCase(getKakaoLoginUrl.fulfilled, (state, action) => {
            state.loading = false
            state.loginUrl = action.payload
         })
         .addCase(getKakaoLoginUrl.rejected, (state) => {
            state.loading = false
         })
         .addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload
         })
   },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
