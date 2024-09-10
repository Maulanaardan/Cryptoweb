import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import HomePage from './pages/homepage.jsx';
import AllCoinProvider from './context/getcoin.jsx';
import CoinPage from './pages/coin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/coin/:id',
    element: <CoinPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AllCoinProvider>
      <RouterProvider router={router} />
    </AllCoinProvider>
  </React.StrictMode>
);
