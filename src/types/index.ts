export interface ImagesProps {
  name: string;
  uid: string;
  url: string;
}

export interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export interface LoadProjectProps {
  id: string;
  images: ImagesProps[];
  title: string;
  date: string;
  client: string;
  price: number;
}

export interface ProjectProps {
  id: string;
  images: ImagesProps[];
  title: string;
  date: string;
  client: string;
  price: string;
  color: string;
  size: string;
  description: string;
  created: string;
  owner: string;
  uid: string;
}