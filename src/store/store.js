import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import emailReducer from '../features/emailSlice'
import itemReducer from '../features/itemSlice'
import mypageReducer from '../features/mypageSlice'
const store = configureStore({
   reducer: {
      auth: authReducer,
      email: emailReducer,
      item: itemReducer,
      mypage: mypageReducer,
   },
})

export default store
