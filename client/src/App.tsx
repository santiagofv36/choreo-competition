import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <main className="w-full max-h-full bg-primary">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
