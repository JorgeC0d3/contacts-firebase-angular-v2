import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { firebaseProviders } from './firebase/firebase.config';  // Importar la configuración de Firebase
import { routes } from './app.routes';


/*
  Incluimos los proveedores de Firebase.
  Utilizamos desestructuración para incluir todos los proveedores definidos en firebaseProviders. 
  Este array contiene los proveedores de Firebase, como provideFirebaseApp y provideFirestore, que 
  inician Firebase y Firestore en tu aplicación.
*/

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withViewTransitions(), withComponentInputBinding()), ...firebaseProviders]
};
