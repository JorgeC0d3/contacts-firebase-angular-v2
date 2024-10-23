import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./contacts/contacts-routes/contacts.routes'),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
