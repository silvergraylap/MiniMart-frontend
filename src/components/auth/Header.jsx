import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout, fetchUserInfoThunk } from '../../features/authSlice'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
   width: 100px;
   height: 32px;
   font-size: 14px;
   border: none;
   border-radius: 6px;
   margin-right: 10px;
   cursor: pointer;
`

const LoginButton = styled.button`
   width: 69px;
   height: 25px;
   font-size: 10px;
   background-color: #2c2c2c;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
`
function Haeder() {
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
   console.log(user)

   return (
      <div>
         <div style={{ display: 'flex', width: '100%', height: '89px' }}>
            <div style={{ width: '315px', height: '80px', marginLeft: '30px' }}>
               <Link to="/">
                  <img src="/Logo.png" alt="로고" />
               </Link>
            </div>
            <div style={{ width: '600px', height: '89px', display: 'flex', alignItems: 'center', marginRight: '50px' }}>
               <button style={{ fontSize: '14px', border: 'none', borderRadius: '6px', marginRight: '10px', width: '100px', height: '32px', backgroundColor: '#FACC15', color: 'white' }}>상품 주문</button>
               <Button>장바구니</Button>
               <Button>채팅</Button>
               <Button>고객센터</Button>
               {user ? (
                  <>
                     <img style={{ width: '40px', height: '40px', borderRadius: '20px' }} src={user.profile_img || '/public/none_profile_img.webp'} alt="프로필" />
                     <p style={{ width: '60px', margin: '0 40px 0 20px' }}>{user.name}</p>
                     <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
                  </>
               ) : (
                  <Link
                     to="/login "
                     style={{
                        display: 'inline-block',
                        width: 'fit-content',
                        textDecoration: 'none',
                     }}
                  >
                     <LoginButton>로그인</LoginButton>
                  </Link>
               )}
            </div>
         </div>
         <div style={{ height: '142px', backgroundColor: '#EBD96B' }}></div>
      </div>
   )
}

export default Haeder
