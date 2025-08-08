import React, { useEffect } from 'react'
import '../../styles/minipage.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout, fetchUserInfoThunk } from '../../features/authSlice'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Home() {
   var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   }

   const follow = ['멋있는 모자', '깔끔한 티셔츠', '힙한 바지', '다이아 반지', '커스텀 슈즈']

   const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user)
   const token = useSelector((state) => state.auth.token)

   useEffect(() => {
      if (token && !user) {
         dispatch(fetchUserInfoThunk())
      }
   }, [dispatch, token, user])

   return (
      <div style={{ width: '1200px' }}>
         {/* 검색하는 부분 */}
         <div className="search-bar">
            <img className="search-logo" src="Logo.png" alt="로고" />
            <div className="serach">
               <div className="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
               <div className="search-text">
                  <p>검색어를 입력해주세요</p>
               </div>
               <div className="search-icon">
                  <SearchIcon />
               </div>
            </div>
         </div>
         <div className="slider">
            {/* 슬라이드 부분 */}
            <Slider {...settings}>
               <div>
                  <img src="/slide1.jpg" alt="slide1" />
               </div>
               <div>
                  <img src="/slide2.jpg" alt="slide2" />
               </div>
               <div>
                  <img src="/slide3.jpg" alt="slide3" />
               </div>
               <div>
                  <img src="/slide4.jpg" alt="slide4" />
               </div>
            </Slider>
         </div>
         <div>
            <h1>팔로잉한 상점들</h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', margin: '20px' }}>
               {follow.map((e, i) => (
                  <div className="follow-card" key={i}>
                     <div>{e}</div>
                     <div>
                        {user ? (
                           <div className="follow-pro">
                              <img src={user.profile_img} alt={`${i}번째이미지`} />
                              <p>{user.name}</p>
                           </div>
                        ) : (
                           <div>판매자1</div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Home
