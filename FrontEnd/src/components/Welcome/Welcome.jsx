import { useSelector } from 'react-redux';

const Welcome = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex items-center justify-center h-[88.7vh] ">
      <h2 className="text-2xl font-bold">
        Welcome, {user ? user.email : 'Guest'}! You are logged in as {user ? user.role : 'N/A'}.
      </h2>
    </div>
  );
};

export default Welcome;
