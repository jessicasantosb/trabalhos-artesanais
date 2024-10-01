import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

import { auth, db } from '../services';
import { ProjectProps } from '../types';

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
  loadProjects: () => void;
  projects: ProjectProps[];
  setProjects: Dispatch<SetStateAction<ProjectProps[]>>;
  projectsDuplicated: ProjectProps[];
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [projectsDuplicated, setProjectsDuplicated] = useState<ProjectProps[]>(
    []
  );

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

  const loadProjects = () => {
    const projectRef = collection(db, 'trabalhos');
    const queryRef = query(projectRef, where('uid', '==', user?.uid));

    getDocs(queryRef).then((snapshot) => {
      const projectsList = [] as ProjectProps[];

      snapshot.forEach((doc) => {
        projectsList.push({
          id: doc.id,
          images: doc.data().images,
          title: doc.data().title,
          date: doc.data().date,
          client: doc.data().client,
          price: doc.data().price,
        });
      });

      setProjects(projectsList);
      setProjectsDuplicated(projectsList);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!user,
        loadingAuth,
        user,
        handleUserInfo,
        loadProjects,
        projects,
        setProjects,
        projectsDuplicated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
