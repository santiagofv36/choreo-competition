/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from './routes.tsx';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import store from './app/store.ts';
import React from 'react';
import { getCurrentUser } from './app/api/apiSlice.ts';

const Helper = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCurrentUser() as any);
  }, [dispatch]);

  return <div></div>;
};

function App() {
  return (
    <main className="w-full max-h-full">
      <Provider store={store}>
        <Toaster />
        <Helper />
        <RouterProvider router={BrowserRouter} />
      </Provider>
    </main>
  );
}

export default App;
