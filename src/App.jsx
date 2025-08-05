import { Route, Routes } from 'react-router-dom'
import LoginKakao from './pages/LoginKakao'
import LoginSuccess from './pages/LoginSuccess'

// import './styles/common.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { checkAuthStatusThunk } from './features/authSlice'

// import Home from './pages/Home'
// import Navbar from './components/shared/Navbar'
// import Footer from './components/shared/Footer'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
// import ItemCreatePage from './pages/ItemCreatePage'

// import ItemListPage from './pages/ItemListPage'
// import ItemEditPage from './pages/ItemEditPage'
// import ItemSellDetailPage from './pages/ItemSellDetailPage'
// import MyOrderListPage from './pages/MyOrderListPage'
// import TokenPage from './pages/TokenPage'
// import ChatPage from './pages/ChatPage'
// import ChartPage from './pages/ChartPage'

function App() {
   return <></>
}

export default App
