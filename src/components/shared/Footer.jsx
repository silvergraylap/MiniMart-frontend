import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
   const styles = {
      footer: { backgroundColor: '#f8f8f8', color: '#555', padding: '3rem 2rem' },
      container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' },
      section: { display: 'flex', flexDirection: 'column' },
      title: { fontWeight: 'bold', color: 'black', marginBottom: '1rem' },
      link: { color: '#555', textDecoration: 'none', marginBottom: '0.5rem' },
      socialIcons: { display: 'flex', gap: '1rem', marginTop: '1rem' },
   }

   return (
      <footer style={styles.footer}>
         <div style={styles.container}>
            <div style={styles.section}>
               <h3 style={styles.title}>Company</h3>
               <Link to="/about" style={styles.link}>
                  브랜드 소개
               </Link>
               <Link to="/stores" style={styles.link}>
                  매장
               </Link>
            </div>
            <div style={styles.section}>
               <h3 style={styles.title}>제품 목록</h3>
               <Link to="/products/bags" style={styles.link}>
                  가방
               </Link>
               <Link to="/products/shirts" style={styles.link}>
                  셔츠
               </Link>
               <Link to="/products/jackets" style={styles.link}>
                  자켓
               </Link>
            </div>
            <div style={styles.section}>
               <h3 style={styles.title}>고객 서비스</h3>
               <Link to="/shipping" style={styles.link}>
                  배송 서비스
               </Link>
               <Link to="/faq" style={styles.link}>
                  FAQ
               </Link>
               <Link to="/returns" style={styles.link}>
                  반품 신청
               </Link>
               <Link to="/orders" style={styles.link}>
                  주문 배송 조회
               </Link>
            </div>
            <div style={styles.section}>
               <h3 style={styles.title}>Terms & conditions</h3>
               <Link to="/privacy" style={styles.link}>
                  Privacy Policy
               </Link>
               <div style={styles.socialIcons}>
                  <FacebookIcon />
                  <InstagramIcon />
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
