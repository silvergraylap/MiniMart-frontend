import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { itemRecent } from '../api/itemApi'

// 최근 상품 가져오기
export const itemRecentThunk = createAsyncThunk('item/itemRecent', async (_, { rejectWithValue }) => {
   try {
      const data = await itemRecent()
      console.log(data)
      return data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '최근 상품 가져오기 실패')
   }
})

const initialState = {
   loading: false,
   error: null,
   itemRecent: { items: [] },
}

const itemSlice = createSlice({
   name: 'item',
   initialState,
   extraReducers: (builder) => {
      builder
         //   최근 등록된 상품
         .addCase(itemRecentThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(itemRecentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.itemRecent = action.payload
         })
         .addCase(itemRecentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default itemSlice.reducer
