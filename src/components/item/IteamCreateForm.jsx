import { useDispatch } from 'react-redux'
import { itemCreateThunk } from '../../features/itemSlice'
import { useState } from 'react'
import '../../styles/itemUpload.css'

function IteamCreateForm() {
   const [imgUrls, setImgUrls] = useState([])
   const [imgFiles, setImgFiles] = useState([])
   const [stock, setStock] = useState(false)
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
         <div className="item-upload-form">
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
               <div className="item-upload-form__imgs">
                  <img src="#" alt="#" />
                  <img src="#" alt="#" />
                  <img src="#" alt="#" />
                  <img src="#" alt="#" />
               </div>
               <div className="item_img">
                  <label htmlFor="item_img">상품 이미지 등록 </label>
                  <span> 최대 4개까지 이미지 등록이 가능합니다. (파일당 4mb 제한)</span>
                  <input type="file" name="" id="item_img" hidden multiple accept="image/*" />
               </div>
               <div className="item_name_price">
                  <div className="item_name">
                     <label htmlFor="name">제품 이름</label>
                     <input type="text" name="" id="name" placeholder="제품명 입력" autocomplete="off" />
                  </div>
                  <div className="item_price">
                     <label htmlFor="price">기본가격</label>
                     <input type="number" name="" id="price" placeholder="000원 (숫자만 입력)" autocomplete="off" />
                  </div>
               </div>
               <div>
                  <label htmlFor="stock_number">재고수량</label>
                  <input type="number" name="" id="stock_number" autocomplete="off" placeholder="재고수량 입력" readOnly={stock} />
               </div>
               <div className="item-stock">
                  <label htmlFor="status">판매상태</label>
                  <div className="radio-wrap">
                     <input type="radio" name="status" />
                  </div>
                  <div className="radio-wrap">
                     <input type="radio" name="status" />
                  </div>
                  <div className="radio-wrap">
                     <input type="radio" name="status" />
                  </div>
               </div>
               <div>
                  <label htmlFor="is_sale">할인여부</label>
                  <input type="text" name="" id="is_sale" autocomplete="off" />
               </div>
               <div>
                  <label htmlFor="sale">할인율</label>
                  <input type="text" name="" id="sale" autocomplete="off" />
               </div>
               <div>
                  <label htmlFor="option_name">옵션 이름</label>
                  <input type="text" name="" id="option_name" autocomplete="off" />
               </div>
               <div>
                  <label htmlFor="option_price">옵션 추가가격</label>
                  <input type="text" name="" id="option_price" autocomplete="off" />
               </div>
               <div>
                  <label htmlFor="option_req_item_yn">옵션 대표상품 여부</label>
                  <input type="text" name="" id="option_req_item_yn" autocomplete="off" />
               </div>
               <input type="file" name="" id="img" />
               <button type="submit">등록하기</button>
            </form>
         </div>
      </>
   )
}

export default IteamCreateForm
