import { Route, Routes } from 'react-router-dom'
import LoginKakao from './pages/LoginKakao'
import LoginSuccess from './pages/LoginSuccess'

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<LoginKakao />} />
            <Route path="/login/success" element={<LoginSuccess />} />
         </Routes>
      </>
   )
}

export default App
