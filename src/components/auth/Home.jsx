import React, { useEffect } from 'react'
import '../../styles/minipage.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserInfoThunk } from '../../features/authSlice'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'

function Home() {
   var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   }

   const follow = ['멋있는 모자', '깔끔한 티셔츠', '힙한 바지', '다이아 반지', '커스텀 슈즈']
   const mdProduct = [
      ['1', '직접 만드는 비파', '어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구'],
      ['2', '리코더', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '],
      ['3', '직접 만들어보는 대나무 단소', '민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.'],
      ['4', '청동 거울', '국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.'],
      ['5', '비파형 동검', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
      ['6', '세형 동검', 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'],
   ]

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
         {/* 팔로잉한 상점들 */}
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
         {/* 신제품 출시! 나중에 상품 등록 되면 DB에서 어떻게 가져올지 보고 변경*/}
         <div style={{ display: 'flex' }}>
            <Card sx={{ maxWidth: 345 }}>
               <CardActionArea>
                  <CardMedia sx={{ height: 500 }} component="img" height="140" image="/신제품출시!/new1.png" alt="신제품1" />
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                        주황색 후드티
                     </Typography>
                     <Typography component="div" sx={{ display: 'flex' }}>
                        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                           영희
                        </Typography>
                        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                           →
                        </Typography>
                     </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
               <CardActionArea>
                  <CardMedia sx={{ height: 500 }} component="img" height="140" image="/신제품출시!/new2.png" alt="신제품2" />
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                        비니와 청가죽자켓
                     </Typography>
                     <Typography component="div" sx={{ display: 'flex' }}>
                        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                           영희
                        </Typography>
                        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                           →
                        </Typography>
                     </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
               <CardActionArea>
                  <CardMedia sx={{ height: 500 }} component="img" height="140" image="/신제품출시!/new3.png" alt="신제품3" />
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                        흰 티셔츠
                     </Typography>

                     <Typography component="div" sx={{ display: 'flex' }}>
                        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                           영희
                        </Typography>
                        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                           →
                        </Typography>
                     </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
         </div>
         <div style={{ display: 'flex', margin: '100px', flexWrap: 'wrap' }}>
            {/* MD 추천 픽 나중에 상품 등록 되면 DB에서 어떻게 가져올지 보고 결정*/}
            <h1>MD 추천 픽</h1>
            {mdProduct.map((e) => {
               return (
                  <Card key={e[0]} sx={{ maxWidth: 250, margin: '50px' }}>
                     <CardActionArea>
                        <CardMedia sx={{ height: 250 }} component="img" height="140" image={`/md추천픽/md${e[0]}.png`} alt={`신제품${e[0]}`} />
                        <CardContent>
                           <Typography gutterBottom variant="h6" component="div" className="text-ellipsis1">
                              {e[1]}
                           </Typography>

                           <Typography component="div" sx={{ display: 'flex' }}>
                              <Typography className="text-ellipsis3" component="span" variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                 {e[2]}
                              </Typography>
                           </Typography>
                        </CardContent>
                     </CardActionArea>
                  </Card>
               )
            })}
         </div>
      </div>
   )
}

export default Home
