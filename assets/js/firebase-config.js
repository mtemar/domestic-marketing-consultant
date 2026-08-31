import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCl5WfLerE9xE3Y5itl5WRO448U6QecvmM',
  authDomain: 'domestic-marketing-consultant.firebaseapp.com',
  projectId: 'domestic-marketing-consultant',
  storageBucket: 'domestic-marketing-consultant.firebasestorage.app',
  messagingSenderId: '280562366331',
  appId: '1:280562366331:web:496202469345d384edafde',
  measurementId: 'G-SV0X3LZ063'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
