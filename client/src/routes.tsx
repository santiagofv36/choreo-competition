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
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <HomePage />
        <Footer />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Navbar />
        <ProductPage />
        <Footer />
      </>
    ),
  },
  {
    path: '/products/:id',
    element: (
      <>
        <Navbar />
        <ProductDetailPage />
        <Footer />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Navbar />
        <CartPage />
        <Footer />
      </>
    ),
  },
  {
    path: '/checkout',
    element: (
      <>
        <Navbar />
        <CheckoutPage />
        <Footer />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Navbar />
        <LoginPage />
        <Footer />
      </>
    ),
  },
  {
    path: '/signup',
    element: (
      <>
        <Navbar />
        <SignupPage />
        <Footer />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Navbar />
        <NotFoundPage />
        <Footer />
      </>
    ),
  },
]);
