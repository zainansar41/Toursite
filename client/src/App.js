import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import { useState, useEffect } from 'react';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Contactus from './Pages/Contactus/Contactus';
import Detail from './Pages/DetailPage/Detail';
import TourUpload from './Pages/TourUploader/TourUpload';
import AdminMain from './Pages/Admin/AdminMain/AdminMain';
import Message from './Pages/Admin/Message/Message';

import TripPage from './Pages/TripPage/TripPage';
import ShowUser from './Pages/Admin/showUser/ShowUser';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function App() {
  const [path, setPath] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/contact') {
      setPath(true);
    } else {
      setPath(false);
    }

    // Check the user's role based on the token, if available
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const { role, name } = decodedToken;
      setUserRole(role);
      setName(name);
    }
  }, []);

  return (
    <>
      <Router>
        {!path && <Navbar name={name} role={userRole}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/trips" element={<TripPage />} />

          {userRole === 'HM' || userRole ==='admin' && (
            <Route path="/upload" element={<TourUpload />} />
          )}
          {userRole === 'admin' && (
            <Route path="/admin/main" element={<AdminMain />} />
          )}
          {userRole === 'admin' && (
            <Route path="/admin/message" element={<Message />} />
          )}
          {userRole === 'admin' && (
            <Route path="/admin/user" element={<ShowUser />} />
          )}
        </Routes>
        {!path && <Footer />}
      </Router>
    </>
  );
}

export default App;
