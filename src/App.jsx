import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 공용 컴포넌트들을 가져옵니다.
// Navbar.jsx 파일이 Header라는 이름의 컴포넌트를 export 하고 있으므로 Header로 가져옵니다.
import Header from './components/shared/Navbar'
import Footer from './components/shared/Footer'

// 페이지 컴포넌트들을 가져옵니다.
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import FindPasswordPage from './pages/Findphone' // Findphone.jsx 파일이 FindPasswordPage 컴포넌트를 export 합니다.

// 전체 앱의 레이아웃과 페이지 이동 규칙을 정의하는 메인 컴포넌트입니다.
export default function App() {
   return (
      // BrowserRouter가 전체 앱의 라우팅을 관리합니다.
      <BrowserRouter>
         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* 모든 페이지에 공통으로 보일 상단바 */}
            <Header />

            {/* 페이지의 메인 컨텐츠 영역 */}
            <main style={{ flexGrow: 1 }}>
               <Routes>
                  {/* 주소 경로에 따라 보여줄 페이지를 설정합니다. */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/find-password" element={<FindPasswordPage />} />

                  {/* 여기에 다른 페이지 라우트를 계속 추가할 수 있습니다. */}
                  {/* 예: <Route path="/cart" element={<CartPage />} /> */}
               </Routes>
            </main>

            {/* 모든 페이지에 공통으로 보일 하단바 */}
            <Footer />
         </div>
      </BrowserRouter>
   )
}
