function KakaoLoginButton() {
   const REST_API_KEY = process.env.KAKAO_REST_API_KEY
   const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI

   const handleLogin = () => {
      const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
      window.location.href = kakaoAuthURL
   }

   return (
      <button onClick={handleLogin} style={{ background: '#FEE500', padding: '10px', border: 'none' }}>
         카카오로 로그인
      </button>
   )
}

export default KakaoLoginButton
