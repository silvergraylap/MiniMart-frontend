import React from 'react'
import '../../styles/minipage.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import { Link } from 'react-router-dom'

function Home() {
   const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user)

   const handleLogout = () => {
      dispatch(logout())
   }

   return (
      <div>
         <div className="serach">
            <img className="search-logo" src="Logo.png" alt="로고" />
            <div>
               <span></span>
               <span></span>
               <span></span>
            </div>
            <div>검색어를 입력해주세요</div>
            <div>검색</div>
            <div className="user">
               {user ? (
                  <>
                     <h1>{user.name}님 환영합니다!</h1>
                     <button onClick={handleLogout}>로그아웃</button>
                  </>
               ) : (
                  <button>
                     <Link to={'/login'}>로그인 해주세요</Link>
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}

export default Home
