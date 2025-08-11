import { useDispatch } from 'react-redux'
import { itemCreateThunk } from '../../features/itemSlice'
import { useState } from 'react'
import '../../styles/itemUpload.css'
import DeleteIcon from '@mui/icons-material/Delete'

function IteamCreateForm() {
   const [imgUrls, setImgUrls] = useState([])
   const [imgFiles, setImgFiles] = useState([])
   const [stock, setStock] = useState(false)
   const [options, setOptions] = useState([{ id: 1, name: '', price: 0 }])
   const [formData, setFormData] = useState({ status: 'FOR_SALE', stock_number: 0, price: '0' })

   const dispatch = useDispatch()

   const handleImageChange = (e) => {
      const files = e.target.files // 업로드된 모든 파일 객체 가져오기
      if (!files || files.length === 0) return // 파일이 없거나 파일길이가 0이면 함수 종료

      // 업로드된 파일 객체를 배열로 바꾸고 최대 5개까지만 선택
      const newFiles = Array.from(files).slice(0, 5)

      setImgFiles(newFiles)
   }

   function handleImgs(e) {
      const files = e.target.files

      if (files.length > 4) {
         alert('최대 4개까지 선택할 수 있습니다.')
         e.target.value = null
         return
      }

      for (let file of files) {
         if (file.size > 4 * 1024 * 1024) {
            alert(`파일 "${file.name}"이 4MB를 초과합니다.`)
            e.target.value = null
            return
         }
      }
   }

   function handleImg(e) {
      const files = e.target.files[0]
      for (let file of files) {
         if (file.size > 10 * 1024 * 1024) {
            alert(`파일 "${file.name}"이 10MB를 초과합니다.`)
            e.target.value = null
            return
         }
      }
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

      // dispatch(itemCreateThunk(data))
   }

   function handleFormData(field, value) {
      if (field === 'price' || field == 'stock_number') {
         value = value
            .replace(/[^0-9]/g, '')
            .replace(/^0+/, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
         if (value === '') value = '0'
      }
      if (field == 'sale') {
         value = Number(value.replace(/[^0-9]/g, ''))
         if (value >= 100) {
            value = 99
         }
      }

      setFormData({ ...formData, [field]: value })
      console.log(formData)
   }

   function addOption() {
      setOptions((prev) => [...prev, { id: Date.now(), name: '', price: 0 }])
   }

   function handleChangeOptions(id, field, value) {
      if (field === 'price') {
         value = value
            .replace(/[^0-9]/g, '')
            .replace(/^0+/, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
         if (value === '') value = '0'
      }

      setOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, [field]: value } : opt)))
   }

   function deleteOption(id) {
      return () => {
         const newOptions = options.filter((e) => e.id !== id)
         setOptions(newOptions)
      }
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
                  <input type="file" name="" id="item_img" hidden multiple accept="image/*" onChange={(e) => handleImgs(e)} />
               </div>
               <div className="item_name_price">
                  <div className="item_name">
                     <label htmlFor="name">제품 이름</label>
                     <input
                        type="text"
                        name=""
                        id="name"
                        placeholder="제품명 입력"
                        autoComplete="off"
                        spellCheck="false"
                        value={formData.name}
                        onChange={(e) => {
                           handleFormData('name', e.target.value)
                        }}
                     />
                  </div>
                  <div className="item_price">
                     <label htmlFor="price">기본가격</label>
                     <input type="text" name="" id="price" placeholder="000원 (숫자만 입력)" autoComplete="off" spellCheck="false" value={formData.price} onChange={(e) => handleFormData('price', e.target.value)} />
                  </div>
               </div>
               <div>
                  <label htmlFor="stock_number">재고수량</label>
                  <input type="text" name="" id="stock_number" autoComplete="off" placeholder="재고수량 입력" readOnly={stock} value={formData.stock_number} onChange={(e) => handleFormData('stock_number', e.target.value)} />
               </div>
               <div className="item-stock">
                  <label htmlFor="status">판매상태</label>
                  <div className="radio-wrap">
                     <input type="radio" name="status" id="for-sale" hidden defaultChecked onChange={() => handleFormData('status', 'FOR_SALE')} />
                     <label htmlFor="for-sale">판매중</label>
                     <input type="radio" name="status" id="sold-out" hidden onChange={() => handleFormData('status', 'SOLD_OUT')} />
                     <label htmlFor="sold-out">재고없음(품절)</label>
                     <input type="radio" name="status" id="discontinued" hidden onChange={() => handleFormData('status', 'DISCONTINUED')} />
                     <label htmlFor="discontinued">판매중지</label>
                  </div>
               </div>
               <div>
                  <label htmlFor="img">상세 설명 이미지 등록(1장, 10mb 제한)</label>
                  <input type="file" name="" id="img" accept="image/*" onChange={(e) => handleImg(e)} />
               </div>
               <div className="item-description">
                  <label htmlFor="description">상세 설명</label>
                  <textarea
                     name=""
                     id="description"
                     spellCheck="false"
                     value={formData.description}
                     onChange={(e) => {
                        handleFormData('description', e.target.value)
                     }}
                  ></textarea>
               </div>
               <div className="item-options">
                  <button onClick={addOption}>옵션 추가하기</button>
                  <div className="default">
                     <label htmlFor="option-name">기본옵션</label>
                     <input type="text" name="" id="option-name" placeholder="기본 옵션" spellCheck="false" value={options[0].name} onChange={(event) => handleChangeOptions(1, 'name', event.target.value)} />
                     <label htmlFor="add-price">옵션 추가 가격</label>
                     <input type="text" name="" id="add-price" value={0} readOnly />
                     <i></i>
                  </div>
                  {options.map((e, i) => {
                     if (i == 0) return
                     return (
                        <div className="item-option" key={e.id}>
                           <label htmlFor={`option-name-${e.id}`}>옵션{i}</label>
                           <input type="text" name="" id={`option-name-${e.id}`} placeholder="예) 250mm, XL, 파란색 등..." spellCheck="false" value={e.name} onChange={(event) => handleChangeOptions(e.id, 'name', event.target.value)} />
                           <label htmlFor={`add-price-${e.id}`}>옵션 추가 가격</label>
                           <input type="text" name="" id={`add-price-${e.id}`} value={e.price} onChange={(event) => handleChangeOptions(e.id, 'price', event.target.value)} />
                           <i onClick={deleteOption(e.id)}>
                              <DeleteIcon />
                           </i>
                        </div>
                     )
                  })}
               </div>
               <div className="sale-wrap">
                  <label htmlFor="">할인여부</label>
                  <div className="radio-wrap">
                     <input type="radio" name="sale" id="yes" hidden defaultChecked onChange={() => handleFormData('is_sale', true)} />
                     <label htmlFor="yes">할인판매</label>
                     <input type="radio" name="sale" id="no" hidden onChange={() => handleFormData('is_sale', false)} />
                     <label htmlFor="no">정가판매</label>
                  </div>
                  <label htmlFor="sale">할인율</label>
                  <input type="text" name="" id="sale" placeholder="숫자만 입력 예) 15" autoComplete="off" onChange={(e) => handleFormData('sale', e.target.value)} value={formData.sale} />
                  <div>
                     <p>예상가격 {(Number(formData?.price?.replace(/,/g, '')) * (100 - formData.sale)) / 100 || 0}</p>
                  </div>
               </div>

               <button type="submit">등록하기</button>
            </form>
         </div>
      </>
   )
}

export default IteamCreateForm
