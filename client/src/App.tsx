/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from './routes.tsx';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './app/store.ts';
import React from 'react';
import { getCurrentUser } from './app/api/authSlice.ts';
import { PersistGate } from 'redux-persist/integration/react';

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
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <Helper />
          <RouterProvider router={BrowserRouter} />
        </PersistGate>
      </Provider>
    </main>
  );
}

export default App;
