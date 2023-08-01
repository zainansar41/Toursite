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

import TripPage from './Pages/TripPage/TripPage';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

function App() {
  const [path, setPath] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/contact') {
      setPath(true);
    } else {
      setPath(false);
    }
  }, []);

  return (
    <>
      <Router>
        {!path && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/upload" element={<TourUpload />} />
          <Route path="/admin/main" element={<AdminMain />} />
          <Route path="/trips" element={<TripPage />} />

        </Routes>
        {!path && <Footer />}
      </Router>
    </>
  );
}

export default App;
