import React from 'react'
import { itemCreate } from '../../api/item.Api'
import IteamCreateForm from '../../components/item/IteamCreateForm'

function ItemCreatePage() {
   return (
      <>
         <p>상품 등록 페이지임니다</p>
         <IteamCreateForm />
      </>
   )
}

export default ItemCreatePage
