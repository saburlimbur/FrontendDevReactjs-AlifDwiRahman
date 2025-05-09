import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorElement() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1 className="text-4xl font-bold">{error.message}</h1>
    </div>
  );
}

export default ErrorElement;
