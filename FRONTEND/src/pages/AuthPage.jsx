import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {isLogin ? (
        <LoginForm state={setIsLogin} />
      ) : (
        <RegisterForm state={setIsLogin} />
      )}
    </div>
  );
};

export default AuthPage;