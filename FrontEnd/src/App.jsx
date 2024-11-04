import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Welcome from './components/Welcome/Welcome';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
 
  return (
    <div  className={isDarkMode ? 'dark-mode' : 'light-mode'}>
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<h1 className="text-center mt-20 h-[76.3vh] ">Home Page</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  </Router>
    </div>
  );
};

export default App