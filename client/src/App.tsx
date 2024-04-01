import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from './routes.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  return (
    <main className="w-full max-h-full bg-primary">
      <Navbar />
      <RouterProvider router={BrowserRouter} />
      <Footer />
    </main>
  );
}

export default App;
