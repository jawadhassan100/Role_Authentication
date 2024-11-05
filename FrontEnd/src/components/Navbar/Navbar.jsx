import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { toggleTheme } from '../../redux/themeSlice';
import ButtonToggle from '../ButtonToggle/ButtonToggle';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action
  };


  return (
    <nav className="bg-blue-500 flex justify-between items-center px-8 py-4">
      <h1 className="text-white text-lg font-bold">Role-Based Auth</h1>
      <div className="flex justify-end items-center gap-2">
        <Link to="/" className="text-white mx-2">Home</Link>
        {!user ? (
          <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded">Login</Link>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        )}
        <ButtonToggle onClick={handleThemeToggle} isDarkMode={isDarkMode} />
      </div>
    </nav>
  );
};

export default Navbar;
