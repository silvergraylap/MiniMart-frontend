import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { registerUser, loginUser, logoutUser, checkAuthStatus } from '../api/authApi'

// 카카오 로그인 관련
// 카카오 로그인된 사용자 정보 가져오기
export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (_, { getState, rejectWithValue }) => {
   try {
      const token = getState().auth.token
      const res = await axios.get('http://localhost:8000/auth/kakao/me', {
         headers: { Authorization: `Bearer ${token}` },
      })
      console.log('카카오 사용자 정보:', res)
      return res.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '카카오 사용자 정보 불러오기 실패')
   }
})

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = createAsyncThunk('auth/getKakaoLoginUrl', async (_, { rejectWithValue }) => {
   try {
      const res = await axios.get('http://localhost:8000/auth/kakao/')
      return res.data.url
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '카카오 로그인 URL 불러오기 실패')
   }
})

// 로컬 회원가입/로그인 관련
// 회원가입
export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

// 로그인
export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
   }
})

// 로그아웃
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
   }
})

// 로그인 상태 확인
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 상태 확인 실패')
   }
})

const initialState = {
   token: localStorage.getItem('token') || null, // 카카오 로그인 토큰 저장
   loginUrl: '', // 카카오 로그인 URL
   user: null,
   isAuthenticated: false,
   loading: false,
   error: null,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setToken: (state, action) => {
         state.token = action.payload
         localStorage.setItem('token', action.payload)
      },
      logout: (state) => {
         state.token = null
         state.user = null
         state.isAuthenticated = false
         localStorage.removeItem('token')
      },
   },
   extraReducers: (builder) => {
      /* 카카오 로그인 */
      builder
         .addCase(getKakaoLoginUrl.pending, (state) => {
            state.loading = true
         })
         .addCase(getKakaoLoginUrl.fulfilled, (state, action) => {
            state.loading = false
            state.loginUrl = action.payload
         })
         .addCase(getKakaoLoginUrl.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
         })

         /* 로컬 회원가입 */
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         /* 로컬 로그인 */
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         /* 로컬 로그아웃 */
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         /* 로그인 상태 확인 */
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.payload
         })
   },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
