// src/components/Loading.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading-container">
      <ClipLoader color="#007bff" size={50} />
    </div>
  );
}

export default Loading;
