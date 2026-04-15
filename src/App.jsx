import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
<div className="bg-blobs"></div>
export default App