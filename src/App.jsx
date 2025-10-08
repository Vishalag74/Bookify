import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import List from './pages/List';
import BookDetailPage from './pages/Details';
import MyNavbar from './components/Navbar';
import ViewOrder from './pages/ViewOrder';
import ViewOrderDetail from './pages/ViewOrderDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <MyNavbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<ViewOrder />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  )
}

export default App