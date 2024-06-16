import { ReactNode, useContext } from 'react';
import { ImSpinner } from 'react-icons/im';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps): any {
  const { isSigned, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <div className='h-screen center'>
        <ImSpinner className='animate-spin	text-geraldine' size={54} />
      </div>
    );
  }

  if (!isSigned) {
    return <Navigate to={'/login'} />;
  }
  return children;
}
