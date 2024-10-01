export interface ImagesProps {
  name: string;
  uid: string;
  url: string;
}

export interface ProjectProps {
  id: string;
  images: ImagesProps[];
  title: string;
  date: string;
  client: string;
  price: number;
}
