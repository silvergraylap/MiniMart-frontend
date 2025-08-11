import React from 'react'
import { itemCreate } from '../../api/itemApi'

function ItemCreatePage() {
   return (
      <>
         <p>상품 등록 페이지임니다</p>
         <button onClick={itemCreate}>상품 등록 api 잘 호출되는지 확인하기</button>
      </>
   )
}

export default ItemCreatePage
