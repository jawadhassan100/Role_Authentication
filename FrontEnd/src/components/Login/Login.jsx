import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((action) => {
        if (action.type === 'auth/login/fulfilled') {
            localStorage.setItem('token', action.payload.token);
          navigate('/welcome');
        }
      });
    };
  return (
    <div className='h-[82.5vh] '>

    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border  rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <div className='flex justify-between '>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <Link to="/register">
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </Link>
      </div>
      {status === 'failed' && <p className="text-red-500">{error}</p>}
    </form>
    </div>
  );
};

export default Login;
