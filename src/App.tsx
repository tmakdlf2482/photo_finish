import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
// 페이지 컴포넌트
import MainPage from '@pages/index/index'
import BookmarkPage from '@pages/bookmark/index'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/photo" element={<MainPage/>}></Route>
          <Route path="/photo/search/:id" element={<MainPage/>}></Route>
          <Route path="/photo/bookmark" element={<BookmarkPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App