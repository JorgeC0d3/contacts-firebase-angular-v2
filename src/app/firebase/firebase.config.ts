// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE6wxGHV8VaFs5124kKtyIM4f1zciIbsY",
  authDomain: "angular-contacts-8d034.firebaseapp.com",
  projectId: "angular-contacts-8d034",
  storageBucket: "angular-contacts-8d034.appspot.com",
  messagingSenderId: "637245194003",
  appId: "1:637245194003:web:c448f4d9a293cd883ea4e6"
};

// Exportar el proveedor de Firebase para usarlo en la configuración de la app
export const firebaseProviders = [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ];