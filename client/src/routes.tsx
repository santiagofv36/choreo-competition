import { createBrowserRouter } from 'react-router-dom';
import {
  CartPage,
  CheckoutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductDetailPage,
  ProductPage,
  SignupPage,
} from './pages';

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <ProductPage />,
  },
  {
    path: '/products/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
