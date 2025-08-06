import minimartApi from './axiosApi'
const API_URL = 'http://localhost:8000'

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = async () => {
   try {
      const response = await minimartApi.get(`/auth/kakao`)
      // minimartApi에는 이미 baseURL이 설정되어 있어야 함
      return response.data // { url: '...' } 반환
   } catch (error) {
      console.error('카카오 로그인 오류', error)
      throw error
   }
}

// 로그아웃시 토큰 삭제
export const KakaoLogout = async () => {
   await minimartApi.post('/auth/kakao/logout') // 서버 호출 (선택 사항)
   localStorage.removeItem('token') // 로컬에서 토큰 삭제
}

// 회원가입
export const registerUser = async (userData) => {
   try {
      const response = await minimartApi.post(`${API_URL}/auth/register`, userData)
      return response
   } catch (error) {
      console.error('회원가입 요청 오류:', error)
      throw error
   }
}

// 로그인
export const loginUser = async (credentials) => {
   try {
      const response = await minimartApi.post(`${API_URL}/auth/login`, credentials)
      return response
   } catch (error) {
      console.error('로그인 요청 오류:', error)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await minimartApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error('로그아웃 요청 오류:', error)
      throw error
   }
}

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await minimartApi.get('/auth/status')
      return response
   } catch (error) {
      console.error('로그인 상태 확인 오류:', error)
      throw error
   }
}
