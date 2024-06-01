import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps): any {
  const { isSigned, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <p>Carregando...</p>;
  }

  if (!isSigned) {
    return <Navigate to={'/login'} />;
  }
  return children;
}
