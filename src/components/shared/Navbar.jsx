import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const Header = () => {
   const styles = {
      header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #eee' },
      logo: { fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'black' },
      searchContainer: { display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '20px', padding: '0.5rem 1rem', flexGrow: 1, maxWidth: '500px', marginLeft: '2rem', marginRight: '2rem' },
      searchInput: { border: 'none', outline: 'none', marginLeft: '0.5rem', flexGrow: 1 },
      navIcons: { display: 'flex', gap: '1.5rem' },
      icon: { color: '#555', cursor: 'pointer' },
   }

   return (
      <header style={styles.header}>
         <Link to="/" style={styles.logo}>
            MINIMART
         </Link>

         <div style={styles.searchContainer}>
            <SearchIcon style={{ color: '#999' }} />
            <input type="text" placeholder="검색어를 입력해주세요." style={styles.searchInput} />
         </div>

         <div style={styles.navIcons}>
            <Link to="/login">
               <PersonOutlineIcon style={styles.icon} />
            </Link>
            <Link to="/cart">
               <ShoppingCartOutlinedIcon style={styles.icon} />
            </Link>
            <MenuIcon style={styles.icon} />
         </div>
      </header>
   )
}

export default Header
