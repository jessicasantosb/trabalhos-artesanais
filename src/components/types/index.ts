import { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface FilterByTextProps {
  placeholder: string;
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
}

export interface FilterByYearProps {
  years: number[];
  handleSearchYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface HeadProps {
  title: string;
  description: string;
}

export interface CardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  client: string;
  price: string;
  handleDeleteProject: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface HomePanelProps {
  onSearch: (input: string, field: string) => void;
  years: number[];
  handleSearchYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}
