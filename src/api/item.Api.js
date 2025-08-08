import minimartApi from './axiosApi'
const API_URL = import.meta.env.VITE_API_URL

//상품 추가
export const itemCreate = async (data) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await minimartApi.post(`/item`, data, config)
      return response
   } catch (error) {
      console.error('상품 추가에 실패했습니다. :', error)
      throw error
   }
}
