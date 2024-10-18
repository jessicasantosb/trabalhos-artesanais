import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface FilterByColorProps {
  inputColor: string;
  setInputColor: (event: string) => void;
  handleSearchColor: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface FilterByTitleProps {
  inputTitle: string;
  setInputTitle: (event: string) => void;
  handleSearchTitle: (event: React.MouseEvent<HTMLElement>) => void;
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
  inputTitle: string;
  setInputTitle: (event: string) => void;
  handleSearchTitle: (event: React.MouseEvent<HTMLElement>) => void;
  inputColor: string;
  setInputColor: (event: string) => void;
  handleSearchColor: (event: React.MouseEvent<HTMLElement>) => void;
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