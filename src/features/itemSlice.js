import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { itemCreate } from '../api/item.Api'

//상품 등록
export const itemCreateThunk = createAsyncThunk('item/itemCreate', async (data, { rejectWithValue }) => {
   try {
      const response = await itemCreate(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const authSlice = createSlice({
   name: 'item',
   initialState: {
      loading: false,
      error: null,
      item: null,
      items: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(itemCreateThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(itemCreateThunk.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload.item
         })
         .addCase(itemCreateThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
