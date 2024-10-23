import { Component, inject } from '@angular/core';
import { ContactsService } from '../data-access/contacts.service';
//AsyncPipe: Se usa para gestionar observables de manera eficiente en las plantillas Angular.
import { AsyncPipe } from '@angular/common';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Contact } from '../interfaces/contacts.interface';
//Router: Angular Router se inyecta para manejar la navegación entre páginas (por ejemplo, 
//para editar un contacto).
import { Router } from '@angular/router';

// Declara bootstrap como una variable global
declare var bootstrap: any;

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [AsyncPipe, ContactCardComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent {
  //Injección a contacts.service para poder acceder a sus métodos
  private contactsService = inject(ContactsService);
  private router = inject(Router);
  //contacts$: Es un observable que contiene la lista de contactos. Inicialmente, se asigna llamando 
  //a getContacts() desde ContactsService, lo que significa que está suscrito a los datos de la base 
  //de datos y los actualiza dinámicamente.
  contacts$ = this.contactsService.getContacts();

  /*
  Función: Este método elimina un contacto dado su id.
  Llamada asíncrona: Utiliza await para esperar la finalización de la llamada a deleteContact() 
  del servicio ContactsService.
  Manejo de errores: Usa un bloque try-catch para capturar y manejar posibles errores al eliminar 
  el contacto (aunque el catch está vacío en este caso, podría ser útil para manejar el error).
  */
  async deleteContact(id: string) {
    try {
      await this.contactsService.deleteContact(id);
      // Mostrar toast de éxito
      const successToast = document.getElementById('successToastDelete');
      const toast = new bootstrap.Toast(successToast!);
      toast.show();
    } catch (error) {
      // Mostrar toast de error
      const errorToast = document.getElementById('errorToastDelete');
      const toast = new bootstrap.Toast(errorToast!);
      toast.show();

    }
  }

  /*
  Función: Este método navega a la ruta de edición de contacto, pasando el id del contacto como parte de la URL.
  Navegación: Usa el enrutador (_router) para redirigir al usuario a la ruta /contacts/edit/:id, donde el 
  contacto será editado.
  */
  editContact(contact: Contact) {
    console.log(contact)
    this.router.navigate(['/contacts/edit', contact.id]);
  }
}
