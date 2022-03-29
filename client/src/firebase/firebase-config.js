import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD3yXsZUCZ9Boy1oAtMc9jlefsM-sPaQ60',
  authDomain: 'push-pin-fef72.firebaseapp.com',
  projectId: 'push-pin-fef72',
  storageBucket: 'push-pin-fef72.appspot.com',
  messagingSenderId: '575059018776',
  appId: '1:575059018776:web:ec1b3c185e4712d7c62f6d',
  measurementId: 'G-JLEYVDPJK7',
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
