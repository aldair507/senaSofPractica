// src/component/NotFound.jsx

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-black text-4xl mb-4">404 Page Not Found</h1>
 
      <Link to="/login">
        <button className="bg-blue-500 rounded-lg px-6 py-3 text-white">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
