import { Dispatch, ReactNode, SetStateAction } from 'react';
import { LoadProjectProps } from '../../types';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export interface AuthContextData {
  isSigned: boolean;
  loadingAuth: boolean;
  user: UserProps | null;
  handleUserInfo: ({ uid, name, email }: UserProps) => void;
  loadProjects: () => void;
  projects: LoadProjectProps[];
  setProjects: Dispatch<SetStateAction<LoadProjectProps[]>>;
  projectsDuplicated: LoadProjectProps[];
}
