import { createBrowserRouter } from 'react-router-dom';
import {
  CartPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  ProductDetailPage,
  ProductPage,
} from './pages';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import AuthPage from './pages/AuthPage';

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
    path: '/auth',
    element: (
      <>
        <Navbar />
        <AuthPage />
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
