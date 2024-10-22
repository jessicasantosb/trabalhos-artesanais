import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { EditProject, Head, ProjectDetail } from '../components';
import { db } from '../services';
import { ProjectProps } from '../types';

export function Project() {
  const [project, setProject] = useState<ProjectProps>();
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [imageIsActive, setImageIsActive] = useState<number>(0);
  const [imagePosition, setImagePosition] = useState<number>(0);
  const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSkeleton = () => {
    setSkeleton(false);
  };

  const handleOpenEditForm = () => {
    setEditFormIsOpen(!editFormIsOpen);
  };

  const previewImage = () => {
    if (imageIsActive > 0) setImageIsActive(imageIsActive - 1);
  };

  const nextImage = () => {
    if (project && imageIsActive < project.images.length - 1)
      setImageIsActive(imageIsActive + 1);
  };

  useEffect(() => {
    if (contentRef.current) {
      const { width } = contentRef.current.getBoundingClientRect();
      setImagePosition(-(width * imageIsActive));
    }
  }, [imageIsActive]);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      const docRef = doc(db, 'trabalhos', id);

      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) navigate('/', { replace: true });

          setProject({
            id: snapshot.id,
            title: snapshot.data()?.title,
            date: snapshot.data()?.date,
            client: snapshot.data()?.client,
            price: snapshot.data()?.price,
            color: snapshot.data()?.color,
            size: snapshot.data()?.size,
            description: snapshot.data()?.description,
            created: snapshot.data()?.created,
            owner: snapshot.data()?.owner,
            uid: snapshot.data()?.uid,
            images: snapshot.data()?.images,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    loadProject();
  }, [id, navigate]);

  return (
    <section className='container m-auto p-4'>
      {project && <Head title={project.title} description='' />}

      {!editFormIsOpen ? (
        <>
          <ProjectDetail
            project={project}
            carousel={{ contentRef, imagePosition, nextImage, previewImage }}
            imageSkeleton={{ skeleton, handleSkeleton }}
          />

          <button
            className='group flex items-center gap-2'
            onClick={handleOpenEditForm}
          >
            <MdEdit
              size={20}
              className='text-blue group-hover:text-geraldine'
            />
            clique aqui para{' '}
            <span className='underline text-blue group-hover:text-geraldine'>
              editar
            </span>{' '}
            esse projeto
          </button>
        </>
      ) : (
        project && (
          <EditProject
            project={project}
            setEditFormIsOpen={setEditFormIsOpen}
          />
        )
      )}
    </section>
  );
}
