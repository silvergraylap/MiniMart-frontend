import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMyPage, updateMyPage, deleteAccount, writeReview, unfollowSeller } from '../api/mypageApi'

// 내 정보 불러오기
export const fetchMyPageThunk = createAsyncThunk('mypage/fetchMyPage', async (_, thunkAPI) => {
   try {
      const res = await getMyPage()
      return res.data
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || '불러오기 실패')
   }
})

// 내 정보 수정
export const updateMyPageThunk = createAsyncThunk('mypage/updateMyPage', async (formData, thunkAPI) => {
   try {
      const res = await updateMyPage(formData)
      return res.data
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || '수정 실패')
   }
})

// 회원 탈퇴
export const deleteAccountThunk = createAsyncThunk('mypage/deleteAccount', async (_, thunkAPI) => {
   try {
      const res = await deleteAccount()
      return res.data
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || '회원 탈퇴 실패')
   }
})

// 리뷰 작성 (orderId와 리뷰 내용 받음)
export const writeReviewThunk = createAsyncThunk('mypage/writeReview', async ({ orderId, reviewData }, thunkAPI) => {
   try {
      const res = await writeReview(orderId, reviewData)
      return res.data
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || '리뷰 작성 실패')
   }
})

// 팔로잉 취소 (sellerId 받음)
export const unfollowSellerThunk = createAsyncThunk('mypage/unfollowSeller', async (sellerId, thunkAPI) => {
   try {
      const res = await unfollowSeller(sellerId)
      return res.data
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || '팔로잉 취소 실패')
   }
})

const mypageSlice = createSlice({
   name: 'mypage',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 회원 탈퇴
         .addCase(deleteAccountThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteAccountThunk.fulfilled, (state) => {
            state.loading = false
            state.user = null
         })
         .addCase(deleteAccountThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 리뷰 작성
         .addCase(writeReviewThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(writeReviewThunk.fulfilled, (state) => {
            state.loading = false
            // 리뷰 작성 후 별도 처리 필요 시 여기에 작성
         })
         .addCase(writeReviewThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 팔로잉 취소
         .addCase(unfollowSellerThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(unfollowSellerThunk.fulfilled, (state, action) => {
            state.loading = false
            // 팔로잉 취소 성공 시 user.followings 배열에서 해당 판매자 제거
            if (state.user) {
               state.user.followings = state.user.followings.filter((seller) => seller.id !== action.meta.arg)
            }
         })
         .addCase(unfollowSellerThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default mypageSlice.reducer
