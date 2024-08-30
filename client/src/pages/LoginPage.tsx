import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/apiClient';

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      console.log(response.data); // Handle login success

      // Assuming login is successful, navigate to the dashboard
      if (response.status === 200) {
        navigate('/dashboard'); // Redirect to the dashboard page
      }
    } catch (error) {
      // Handle login error
      if (error instanceof Error) {
        console.error('Login failed:', error.message);
      } else {
        console.error('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
