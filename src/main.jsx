import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// createRoot를 사용하여 React 앱을 'root' div에 렌더링합니다.
// App 컴포넌트 하나만 렌더링하는 것이 올바른 구조입니다.
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)
