import { Routes } from '@angular/router';

/*
path: 'dashboard': Esta es la ruta principal para el dashboard. Todo lo que ocurre bajo el dashboard 
tiene rutas anidadas (especificadas en el arreglo children). Esta es la ruta base que se usará para 
gestionar el listado de contactos, la creación y la edición.

children: Define rutas anidadas dentro de la ruta principal dashboard. Las rutas dentro de children son 
subrutas que se cargan cuando el usuario navega a rutas como /dashboard/create o /dashboard/edit/:contactId.

path: '**': El patrón ** es un comodín que captura cualquier ruta que no coincida con las rutas definidas 
anteriormente. En otras palabras, es la ruta "catch-all" que se activa cuando el usuario navega a una URL que no existe.
redirectTo: Si el usuario navega a una ruta no válida, será redirigido automáticamente a la ruta /contacts. 
Esto es útil para manejar errores de navegación o URLs incorrectas.

Se asegura que los componentes que se cargan perezosamente con loadComponent se importan correctamente 
usando .then(m => m.NombreDelComponente).
*/

export default [
  {
    path: 'contacts',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../contacts-list/contacts-list.component').then(m => m.ContactsListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../contact-create/contact-create.component').then(m => m.ContactCreateComponent),
      },
      {
        path: 'edit/:contactId',
        loadComponent: () =>
          import('../contact-edit/contact-edit.component').then(m => m.ContactEditComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'contacts',
  },
] as Routes;