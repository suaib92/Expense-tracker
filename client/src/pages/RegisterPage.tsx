import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/apiClient';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleRegister = async (email: string, password: string, username?: string) => {
    try {
      console.log('Registering user with:', { email, username });
      const response = await registerUser(username!, email, password);
      console.log('Registration response:', response);

      // Handle registration success based on the response status
      if (response.status === 201) { // Check for 201 Created
        console.log('Registration successful, redirecting to login page');
        navigate('/login'); // Redirect to the login page
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle registration error
      if (error instanceof Error) {
        console.error('Registration failed:', error.message);
      } else {
        console.error('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-green-300 to-green-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <AuthForm type="register" onSubmit={handleRegister} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
