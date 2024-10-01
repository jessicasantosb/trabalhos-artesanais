import { ReactNode } from 'react';
import { ImSpinner } from 'react-icons/im';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps): any {
  const { isSigned, loadingAuth } = useAuthContext();

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
