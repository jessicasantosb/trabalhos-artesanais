import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import AuthProvider from './context/AuthContext';
import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Private from './routes/Private';
import Project from './pages/Project';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
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
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
