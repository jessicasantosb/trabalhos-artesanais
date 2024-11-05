import { Dispatch, LegacyRef, SetStateAction } from 'react';
import {
  FieldErrors,
  RegisterOptions,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { ProjectProps } from '../../types';

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
  defaultValue?: string;
  type: string;
  name: string;
  register: UseFormRegister<{
    color: string;
    title: string;
    description: string;
    date: string;
    client: string;
    price: number;
    size: string;
  }>;
  error?: string;
  rules?: RegisterOptions;
}

export interface ProjectDetailProps {
  project: ProjectProps | undefined;
  carousel: {
    contentRef: LegacyRef<HTMLDivElement>;
    imagePosition: number;
    previewImage: () => void;
    nextImage: () => void;
  };
  imageSkeleton: { skeleton: boolean; handleSkeleton: () => void };
}

export interface EditProjectProps {
  project: ProjectProps;
  setEditFormIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface EditFormProps {
  project: ProjectProps;
  setEditFormIsOpen: (isOpen: boolean) => void;
  formHook: {
    handleSubmit: UseFormHandleSubmit<
      {
        title: string;
        date: string;
        client: string;
        price: number;
        color: string;
        size: string;
        description: string;
      },
      undefined
    >;
    handleEditProject: (data: FormData) => Promise<void>;
    register: UseFormRegister<{
      color: string;
      title: string;
      description: string;
      date: string;
      client: string;
      price: number;
      size: string;
    }>;
    errors: FieldErrors<{
      title: string;
      date: string;
      client: string;
      price: number;
      color: string;
      size: string;
      description: string;
    }>;
  };
}
