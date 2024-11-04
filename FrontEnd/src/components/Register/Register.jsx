import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, role })).then((action) => {
        if (action.type === 'auth/register/fulfilled') {
          navigate('/login');
        }
      });
    };
  return (
    <div className='h-[82.5vh] '>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow-md">
    <h2 className="text-xl font-bold mb-4">Register</h2>
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
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="border p-2 mb-4 w-full"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    {status === 'failed' && <p className="text-red-500">{error}</p>}
  </form>
    </div>
);
};

export default Register;
