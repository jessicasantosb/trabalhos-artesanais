import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Head, HomeCard, HomePanel } from '../components';
import { useAuthContext } from '../hooks';
import { db, storage } from '../services';
import { ProjectProps } from '../types';

export function Home() {
  const [inputTitle, setInputTitle] = useState('');
  const [inputColor, setInputColor] = useState('');
  const { user, projects, setProjects, projectsDuplicated, loadProjects } =
    useAuthContext();

  const years: number[] = [];
  projectsDuplicated.forEach((project) => {
    const date = new Date(project.date);
    const year = date.getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    years.sort();
  });

  useEffect(() => {
    loadProjects();
  }, []);

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

    const q = query(
      collection(db, 'trabalhos'),
      where('uid', '==', user?.uid),
      where(field, '>=', input.toUpperCase()),
      where(field, '<=', input.toUpperCase() + '\uf8ff')
    );

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

  const handleSearchYear = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;

    if (year === '' || year === 'all') {
      loadProjects();
      return;
    }

    setProjects([]);
    let yearField;

    projectsDuplicated.forEach((project) => {
      const projectYear = new Date(project.date).getFullYear().toString();

      if (year === projectYear) {
        yearField = project.date;
      }
    });

    const q = query(
      collection(db, 'trabalhos'),
      where('uid', '==', user?.uid),
      where('date', '==', yearField)
    );

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
      <Head title='Início' description='Experimente agora!' />

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
        handleSearchYear={handleSearchYear}
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
