import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from './routes.tsx';

function App() {
  return (
    <main className="w-full max-h-full">
      <RouterProvider router={BrowserRouter} />
    </main>
  );
}

export default App;
