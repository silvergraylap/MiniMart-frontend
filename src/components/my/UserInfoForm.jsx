import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyPageThunk, updateMyPageThunk, deleteAccountThunk } from '../../features/mypageSlice'

const API_BASE_URL = import.meta.env.VITE_API_URL

const UserInfoForm = () => {
   const fileInputRef = useRef(null)
   const dispatch = useDispatch()
   const user = useSelector((state) => state.mypage.user)
   const { loading, error } = useSelector((state) => state.mypage)
   const [previewImage, setPreviewImage] = useState('')
   const token = localStorage.getItem('token')

   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      address: '',
      profileImage: '',
   })

   useEffect(() => {
      dispatch(fetchMyPageThunk())
   }, [dispatch])

   useEffect(() => {
      if (user) {
         setFormData({
            name: user.name || '',
            phone: user.phone || '',
            email: user.email || '',
            address: user.address || '',
            profileImage: user.profileImage || '',
         })
         setPreviewImage(user.profileImage || '')
      }
   }, [user])

   const handleImageClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click()
      }
   }

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSave = () => {
      dispatch(updateMyPageThunk(formData))
         .unwrap()
         .then(() => {
            alert('수정사항이 성공적으로 적용되었습니다.')
         })
         .catch((error) => {
            console.error('업데이트 실패 에러:', error) // ① 에러 출력 추가
            // 에러 메시지 구조가 다를 수 있어서 여러 경우를 대비
            if (typeof error === 'string') {
               alert(`수정 실패: ${error}`)
            } else if (error?.message) {
               alert(`수정 실패: ${error.message}`)
            } else if (error?.data?.message) {
               alert(`수정 실패: ${error.data.message}`)
            } else {
               alert('수정 실패: 알 수 없는 오류가 발생했습니다.')
            }
         })
   }

   const handleDeleteAccount = () => {
      if (window.confirm('정말 회원탈퇴 하시겠습니까?')) {
         dispatch(deleteAccountThunk())
            .unwrap()
            .then(() => {
               alert('정상적으로 탈퇴 되었습니다.')
               // 로그아웃 처리 or 리다이렉트 등 추가 필요
            })
            .catch((err) => {
               alert(`회원 탈퇴 실패: ${err}`)
            })
      }
   }

   const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file && file.type.startsWith('image/')) {
         const reader = new FileReader()
         reader.onloadend = () => {
            setPreviewImage(reader.result)
         }
         reader.readAsDataURL(file)

         uploadProfileImage(file)
            .then((uploadedImageUrl) => {
               setFormData((prev) => ({ ...prev, profileImage: uploadedImageUrl }))
            })
            .catch(() => {
               alert('이미지 업로드 실패')
               setPreviewImage(formData.profileImage)
            })
      } else {
         alert('이미지 파일만 선택해주세요.')
      }
   }

   const uploadProfileImage = async (file) => {
      const formData = new FormData()
      formData.append('profileImage', file)

      const response = await fetch(`${API_BASE_URL}/mypage/uploads/profile-image`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
         },
         body: formData,
         credentials: 'include',
      })

      if (!response.ok) {
         throw new Error('업로드 실패')
      }
      const data = await response.json()
      return data.url
   }

   if (loading && !user) return <p>로딩 중...</p>

   return (
      <div className="user-info-box">
         {loading && !user && <p className="loading">로딩 중...</p>}
         {error && <p className="error">에러: {error}</p>}

         <div className="user-info-left" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
            <img className="user-profile-img" src={previewImage || '/default-profile.png'} alt="프로필" style={{ cursor: 'pointer' }} />
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
         </div>

         <div className="profile-card">
            <div className="profile-row">
               <label htmlFor="name">이름</label>
               <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
            </div>

            <div className="profile-row">
               <label htmlFor="phone">전화번호</label>
               <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="profile-row">
               <label htmlFor="email">이메일</label>
               <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="profile-row">
               <label htmlFor="address">주소</label>
               <input id="address" name="address" type="text" className="user-address-input" value={formData.address} onChange={handleChange} />
            </div>

            <button className="btn btn-save" onClick={handleSave} disabled={loading}>
               {loading ? '저장 중...' : '수정된 정보 저장'}
            </button>
            <button className="btn btn-withdraw" onClick={handleDeleteAccount} disabled={loading}>
               회원 탈퇴
            </button>
         </div>
      </div>
   )
}

export default UserInfoForm
