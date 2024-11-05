import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Welcome from './components/Welcome/Welcome';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { logout } from './redux/authSlice';
import "./App.css"

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        return null; // No token, no need to check
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logout())
        localStorage.removeItem('token');
        navigate('/login');
        console.log("Logged out: Token has expired.");
      } else {
        const timeRemaining = decodedToken.exp - currentTime;
        console.log(`You will be logged out in ${timeRemaining} seconds.`);
      }
    };

    // Check token immediately on mount
    checkToken();

    // Set an interval to check token every minute (or any preferred interval)
    const interval = setInterval(checkToken, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [navigate , dispatch , token]);

 
  return (
    <div  className={isDarkMode ? 'dark-mode' : 'light-mode'}>
    <Navbar />
    <Routes>
      <Route path="/" element={<h1 className="text-center mt-20 h-[76.3vh] ">Home Page</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
    </div>
  );
};

export default App