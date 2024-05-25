import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
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

  return <RouterProvider router={router} />;
}

export default App;
