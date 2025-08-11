import { useDispatch } from 'react-redux'
import { itemCreateThunk } from '../../features/itemSlice'
import { useState } from 'react'

function IteamCreateForm() {
   const [imgUrls, setImgUrls] = useState([])
   const [imgFiles, setImgFiles] = useState([])
   const dispatch = useDispatch()

   const handleImageChange = (e) => {
      const files = e.target.files // 업로드된 모든 파일 객체 가져오기
      if (!files || files.length === 0) return // 파일이 없거나 파일길이가 0이면 함수 종료

      // 업로드된 파일 객체를 배열로 바꾸고 최대 5개까지만 선택
      const newFiles = Array.from(files).slice(0, 5)

      setImgFiles(newFiles)
   }

   function handleSubmit(e) {
      e.preventDefault()

      const data = {
         name: '신발',
         price: 5000,
         stock_number: '10',
         description: '신발입니다',
         status: 'FOR_SALE',
         is_sale: true,
         sale: 20,
         options: [
            { name: '250', price: 0, req_item_yn: true },
            { name: '260', price: 0, req_item_yn: false },
         ],
      }

      dispatch(itemCreateThunk(data))
   }
   return (
      <>
         <div className="form-wrap">
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="name">제품명</label>
                  <input type="text" name="" id="name" />
               </div>
               <div>
                  <label htmlFor="price">기본가격</label>
                  <input type="text" name="" id="price" />
               </div>
               <div>
                  <label htmlFor="stock_number">재고수량</label>
                  <input type="text" name="" id="stock_number" />
               </div>
               <div>
                  <label htmlFor="status">판매상태</label>
                  <input type="text" name="" id="status" />
               </div>
               <div>
                  <label htmlFor="is_sale">할인여부</label>
                  <input type="text" name="" id="is_sale" />
               </div>
               <div>
                  <label htmlFor="sale">할인율</label>
                  <input type="text" name="" id="sale" />
               </div>
               <div>
                  <label htmlFor="option_name">옵션 이름</label>
                  <input type="text" name="" id="option_name" />
               </div>
               <div>
                  <label htmlFor="option_price">옵션 추가가격</label>
                  <input type="text" name="" id="option_price" />
               </div>
               <div>
                  <label htmlFor="option_req_item_yn">옵션 대표상품 여부</label>
                  <input type="text" name="" id="option_req_item_yn" />
               </div>
               <input type="file" name="" id="img" multiple accept="image/*" />
               <button type="submit">등록하기</button>
            </form>
         </div>
      </>
   )
}

export default IteamCreateForm
