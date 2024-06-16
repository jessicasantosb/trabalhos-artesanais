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
import toast from 'react-hot-toast';
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
  price: number;
}

export default function Home() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputColor, setInputColor] = useState('');
  const [inputYear, setInputYear] = useState('');

  const { user } = useContext(AuthContext);
  const years: number[] = [];

  projects.forEach((project) => {
    const date = new Date(project.date);
    const year = date.getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    years.sort();

    console.log(typeof project.price);

  });

  useEffect(() => {
    loadProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    });
  };

  const handleDeleteProject = async (project: ProjectProps) => {
    const projectItem = project;

    const answer = window.confirm(
      'Tem certeza que deseja apagar esse trabalho?'
    );

    if (answer) {
      const docRef = doc(db, 'trabalhos', project.id);
      await deleteDoc(docRef);

      projectItem.images.map(async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);

        try {
          await deleteObject(imageRef);
          toast.success('Deletado com sucesso!');
          setProjects(
            projects.filter((project) => project.id !== projectItem.id)
          );
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  const handleSearch = async (field: string, input: string) => {
    if (input === '' || input === 'all') {
      loadProjects();
      return;
    }

    setProjects([]);

    let q;

    if (field === 'date') {
      projects.forEach((project) => {
        const date = new Date(project.date);
        const year = date.getFullYear();
        if (input === year.toString()) {
          input = project.date;
        }
      });

      q = query(
        collection(db, 'trabalhos'),
        where('uid', '==', user?.uid),
        where(field, '==', input)
      );
    } else {
      q = query(
        collection(db, 'trabalhos'),
        where('uid', '==', user?.uid),
        where(field, '>=', input.toUpperCase()),
        where(field, '<=', input.toUpperCase() + '\uf8ff')
      );
    }

    const querySnapshot = await getDocs(q);

    const projectsList = [] as ProjectProps[];

    querySnapshot.forEach((doc) => {
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
  };

  return (
    <section className='min-h-screen container m-auto p-4'>
      <div className='relative pt-10 select-none'>
        <h1 className='text-3xl font-bold pb-2 sm:text-5xl before:absolute before:bottom-2 before:-left-2 before:h-4 before:w-4 sm:before:bottom-1 sm:before:-left-4 sm:before:h-6 sm:before:w-6 before:bg-blue before:-z-10'>
          Seus Trabalhos
        </h1>
      </div>
      <p className='pb-4 text-base sm:text-lg select-none'>
        Registre e Gerencie Suas <span className='font-bold'>Criações</span> e{' '}
        <span className='text-blue font-bold'>Vendas</span>
      </p>

      <HomePanel
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
        handleSearchTitle={() => handleSearch('title', inputTitle)}
        inputColor={inputColor}
        setInputColor={setInputColor}
        handleSearchColor={() => handleSearch('color', inputColor)}
        years={years}
        inputYear={inputYear}
        setInputYear={setInputYear}
        handleSearchYear={handleSearch}
      />

      {projects.length ? (
        <main className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {projects.map((project) => {
            return (
              <HomeCard
                key={project.id}
                id={project.id}
                image={project.images[0].url}
                title={project.title}
                date={project.date}
                client={project.client}
                price={project.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
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
