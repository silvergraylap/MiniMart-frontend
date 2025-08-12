import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// 아이콘들을 가져옵니다.
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
   const [searchTerm, setSearchTerm] = useState('')

   const handleSearch = () => {
      // 여기에 실제 검색 로직을 추가합니다.
      // 예: navigate(`/search?q=${searchTerm}`);
      alert(`검색어: ${searchTerm}`)
   }

   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }

   const styles = {
      container: {
         display: 'flex',
         alignItems: 'center',
         padding: '1.5rem 2rem',
         backgroundColor: 'white',
         gap: '1.5rem',
      },
      logo: {
         fontSize: '1.5rem',
         fontWeight: 'bold',
         color: '#333',
         textDecoration: 'none',
      },
      searchBox: {
         display: 'flex',
         alignItems: 'center',
         flexGrow: 1,
         border: '1px solid #ddd',
         borderRadius: '8px',
         padding: '0.5rem 1rem',
      },
      input: {
         border: 'none',
         outline: 'none',
         flexGrow: 1,
         marginLeft: '0.5rem',
         fontSize: '1rem',
      },
   }

   return (
      <div style={styles.container}>
         <Link to="/" style={styles.logo}>
            MINIMART
         </Link>
         <MenuIcon style={{ cursor: 'pointer' }} />

         <div style={styles.searchBox}>
            <input type="text" placeholder="검색어를 입력해주세요." style={styles.input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
            <SearchIcon style={{ color: '#555', cursor: 'pointer' }} onClick={handleSearch} />
         </div>
      </div>
   )
}

export default SearchBar
