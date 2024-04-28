/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from '@/routes.tsx';
import { store, persistor } from '@/app/store.ts';
import { getCurrentUser } from '@/app/api/authSlice.ts';
import { PathProvider } from './hooks/use-previouspath';

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
          <PathProvider>
            <RouterProvider router={BrowserRouter} />
          </PathProvider>
        </PersistGate>
      </Provider>
    </main>
  );
}

export default App;
