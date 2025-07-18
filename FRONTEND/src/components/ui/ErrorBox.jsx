import React from 'react';

const ErrorBox = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
    {message}
  </div>
);

export default ErrorBox;