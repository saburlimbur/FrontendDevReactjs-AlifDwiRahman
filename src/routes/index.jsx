import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailPage from '../pages/_id';
import App from '../App';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/detail/:id',
    element: <DetailPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={routes} />;
}
