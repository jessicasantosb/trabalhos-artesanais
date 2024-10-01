import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import { Layout } from './components';
import { AuthProvider } from './context';
import {
  Chart,
  Create,
  Home,
  Login,
  NotFound,
  Project,
  Register,
} from './pages';
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
          path: 'criar',
          element: (
            <Private>
              <Create />
            </Private>
          ),
        },
        {
          path: 'projeto/:id',
          element: (
            <Private>
              <Project />
            </Private>
          ),
        },
        {
          path: 'grafico',
          element: (
            <Private>
              <Chart />
            </Private>
          ),
        },
        {
          path: 'entrar',
          element: <Login />,
        },
        {
          path: 'cadastrar',
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
