import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import { Layout } from './components';
import { AuthProvider } from './context';
import { Create, Home, Login, NotFound, Project, Register } from './pages';
import { Private } from './routes';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <Private>
              <Home />
            </Private>
          ),
        },
        {
          path: 'create',
          element: (
            <Private>
              <Create />
            </Private>
          ),
        },
        {
          path: 'project/:id',
          element: (
            <Private>
              <Project />
            </Private>
          ),
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
