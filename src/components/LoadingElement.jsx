import React from 'react';

function LoadingElement() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-t-4 border[#002B56] border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingElement;
