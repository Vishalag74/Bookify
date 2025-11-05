import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import List from './pages/List';
import BookDetailPage from './pages/BookDetails';
import ViewOrder from './pages/ViewOrder';
import ViewOrderDetail from './pages/ViewOrderDetail';
import Myorder from './pages/Myorder';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/'];

  React.useEffect(() => {
    const path = location.pathname;
    const allowedExact = [
      '/',
      '/register',
      '/login',
      '/dashboard',
      '/book/list',
      '/book/orders',
      '/book/myorders'
    ];

    const isAllowed =
      allowedExact.includes(path) ||
      path.startsWith('/book/view/') ||   // matches /book/view/:bookId
      path.startsWith('/book/orders/'); // matches /book/orders/:bookId

    if (!isAllowed) {
      window.location.replace('/');
    }
  }, [location]);

  return (
    <div className=''>
      {!hideNavbarPaths.includes(location.pathname) && <MyNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/orders" element={<ViewOrder />} />
        <Route path="/book/orders/:bookId" element={<ViewOrderDetail />} />
        <Route path="/book/myorders" element={<Myorder />} />
      </Routes>
    </div>
  )
}

export default App