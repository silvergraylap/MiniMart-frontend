import React, { useEffect } from 'react'
import '../../styles/minipage.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout, fetchUserInfoThunk } from '../../features/authSlice'
import { Link } from 'react-router-dom'

function Home() {
   const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user)
   const token = useSelector((state) => state.auth.token)

   useEffect(() => {
      if (token && !user) {
         dispatch(fetchUserInfoThunk())
      }
   }, [dispatch, token, user])

   const handleLogout = () => {
      dispatch(logout())
      window.location.reload()
   }

   return (
      <div style={{ width: '100%' }}>
         <div className="serach">
            <img className="search-logo" src="Logo.png" alt="로고" />
            <div>
               <span></span>
               <span></span>
               <span></span>
            </div>
            <div>검색어를 입력해주세요</div>
            <div>검색</div>
         </div>
      </div>
   )
}

export default Home
