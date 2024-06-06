import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import HomeCard from '../components/HomeCard';
import HomePanel from '../components/HomePanel';
import { AuthContext } from '../context/AuthContext';
import { db } from '../services/firebaseConnection';

interface ImageProps {
  name: string;
  uid: string;
  url: string;
}

interface ProjectsProps {
  id: string;
  image: ImageProps[];
  title: string;
  date: string;
  client: string;
  price: string;
}

export default function Home() {
  const [projects, setProjects] = useState<ProjectsProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadProjects = () => {
      const projectRef = collection(db, 'trabalhos');
      const queryRef = query(projectRef, where("uid", "==", user?.uid));

      getDocs(queryRef).then((snapshot) => {
        let projectsList = [] as ProjectsProps[];

        snapshot.forEach((doc) => {
            projectsList.push({
              id: doc.id,
              image: doc.data().images,
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

  return (
    <section className='min-h-screen container m-auto p-4'>
      <HomePanel />
      {projects.length ? (
        <main className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {projects.map(({ id, image, title, date, client, price }) => {
            return (
              <HomeCard
                key={id}
                id={id}
                image={image[0].url}
                title={title}
                date={date}
                client={client}
                price={price}
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
