import React from 'react';
import URLform from '../components/URLform';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
      <URLform/>
    </div>
  </div>
  )
}

export default Home;