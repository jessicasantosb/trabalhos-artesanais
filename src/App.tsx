import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';

import AuthProvider from './context/AuthContext';

import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import Register from './pages/Register';
import Private from './routes/Private';

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
