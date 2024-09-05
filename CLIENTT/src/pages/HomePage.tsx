// CLIENT/src/pages/static/HomePage.tsx

import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the GHG Calculation Tool</h1>
      <p className="text-lg mb-8">Track and manage your emissions from various sources.</p>
      <Link
        to="/stationary-combustion"
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
