import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '../services/firebaseConnection';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

type AuthContextData = {
  isSigned: boolean;
  loadingAuth: boolean;
  user: UserProps | null;
  handleUserInfo: ({ uid, name, email }: UserProps) => void;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });

        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const handleUserInfo = ({ uid, name, email }: UserProps) => {
    setUser({ uid, name, email });
  };

  return (
    <AuthContext.Provider
      value={{ isSigned: !!user, loadingAuth, user, handleUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
