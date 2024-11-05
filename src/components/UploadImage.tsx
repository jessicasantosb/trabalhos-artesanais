import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { GoTrash, GoUpload } from 'react-icons/go';
import { v4 as uuidV4 } from 'uuid';

import { useAuthContext } from '../hooks';
import { storage } from '../services';
import { ImagesProps } from '../types';

export function UploadImage({
  projectImage,
  setProjectImage,
}: {
  projectImage: ImagesProps[];
  setProjectImage: Dispatch<SetStateAction<ImagesProps[]>>;
}) {
  const { user } = useAuthContext();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        handleUpload(image);
      } else {
        alert('Envie apenas imagem jpeg ou png.');
        return;
      }
    }
  };

  const handleUpload = async (image: File) => {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    if (projectImage.length < 5) {
      uploadBytes(uploadRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const imageItem = {
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
          };

          setProjectImage((images) => [...images, imageItem]);
        });
      });
    } else {
      alert('Quantidade máxima de imagens atingida');
    }
  };

  const handleDeleteImage = async (item: ImagesProps) => {
    const imagePath = `images/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setProjectImage(projectImage.filter((image) => image.url !== item.url));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      <button className='h-24 w-full max-w-24 center bg-geraldine'>
        <GoUpload
          size={30}
          className='absolute text-white pointer-events-none'
        />
        <label className='h-full w-full cursor-pointer' arial-hidden='true'>
          <input
            type='file'
            accept='image/*'
            className='opacity-0 hidden'
            onChange={handleFile}
          />
        </label>
      </button>
      {projectImage.map((image) => {
        return (
          <div
            key={image.name}
            className='relative group h-24 center basis-24 grow'>
            <button>
              <GoTrash
                size={32}
                className='absolute bottom-0 right-0 hidden group-hover:block bg-geraldine text-white p-1'
                onClick={() => handleDeleteImage(image)}
              />
            </button>
            <img
              src={image.url}
              alt={image.name}
              className='w-full h-full object-cover'
            />
          </div>
        );
      })}
    </div>
  );
}
