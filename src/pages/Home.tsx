import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import HomeCard from '../components/HomeCard';
import HomePanel from '../components/HomePanel';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../services/firebaseConnection';

interface ImagesProps {
  name: string;
  uid: string;
  url: string;
}

interface ProjectProps {
  id: string;
  images: ImagesProps[];
  title: string;
  date: string;
  client: string;
  price: string;
}

export default function Home() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadProjects = () => {
      const projectRef = collection(db, 'trabalhos');
      const queryRef = query(projectRef, where('uid', '==', user?.uid));

      getDocs(queryRef).then((snapshot) => {
        let projectsList = [] as ProjectProps[];

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
      });
    };

    loadProjects();
  }, []);

  const handleDeleteProject = async (project: ProjectProps) => {
    const projectItem = project;

    const docRef = doc(db, 'trabalhos', project.id);
    await deleteDoc(docRef);

    projectItem.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
        setProjects(
          projects.filter((project) => project.id !== projectItem.id)
        );
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <section className='min-h-screen container m-auto p-4'>
      <HomePanel />
      {projects.length ? (
        <main className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {projects.map((project) => {
            return (
              <HomeCard
                key={project.id}
                id={project.id}
                image={project.images[0].url}
                title={project.title}
                date={project.date}
                client={project.client}
                price={project.price}
                handleDeleteProject={() => handleDeleteProject(project)}
              />
            );
          })}
        </main>
      ) : (
        <main className='center pt-32'>
          <p className='opacity-60'>Seus trabalhos irão aparecer aqui.</p>
        </main>
      )}
    </section>
  );
}
