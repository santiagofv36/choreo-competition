import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from './routes.tsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main className="w-full max-h-full">
      <Toaster />
      <RouterProvider router={BrowserRouter} />
    </main>
  );
}

export default App;
