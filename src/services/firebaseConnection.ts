import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD0-da7KzIXAhYm8G5zNdda_1GKAzvfXNE',
  authDomain: 'trabalhos-artesanais.firebaseapp.com',
  projectId: 'trabalhos-artesanais',
  storageBucket: 'trabalhos-artesanais.appspot.com',
  messagingSenderId: '154181841308',
  appId: '1:154181841308:web:02222ff376cb10a6515859',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}