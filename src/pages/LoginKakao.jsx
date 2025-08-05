// src/pages/LoginKakao.jsx
function LoginKakao() {
   const handleKakaoLogin = () => {
      window.location.href = 'http://localhost:8000/auth/kakao'
   }

   return (
      <div>
         <h1>로그인 페이지</h1>
         <button style={{ border: 'none', backgroundColor: 'white' }} onClick={handleKakaoLogin}>
            <img src="kakao_login_small.png" alt="kakao_login" />
         </button>
      </div>
   )
}

export default LoginKakao
