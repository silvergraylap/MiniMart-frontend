import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import emailReducer from '../features/emailSlice'
import itemReducer from '../features/itemSlice'
<<<<<<< HEAD
=======

>>>>>>> f227a37294885cbeded0edba01c35576fed96d42
const store = configureStore({
   reducer: {
      auth: authReducer,
      email: emailReducer,
      item: itemReducer,
   },
})

export default store
