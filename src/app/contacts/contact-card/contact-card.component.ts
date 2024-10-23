import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../interfaces/contacts.interface';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  //Permite que el componente reciba datos desde su componente padre (en este caso, recibe un objeto Contact).
  //El signo de exclamación ! es un operador que le dice a TypeScript que contact no será null ni undefined al usarse
  @Input({ required: true }) contact!: Contact;

  //Permite que el componente emita eventos personalizados hacia el componente padre.
  @Output() editContact = new EventEmitter<Contact>();

  @Output() deleteContact = new EventEmitter<string>();

  //Recibe como parámetro el contacto completo y emite el evento editContact, enviando el objeto Contact 
  //al componente padre.
  onEditContact(contact: Contact) {
    //console.log(contact)
    this.editContact.emit(contact);
  }

  //Recibe el objeto contact, pero solo emite el id del contacto al componente padre.
  onDeleteContact(contact: Contact) {
    this.deleteContact.emit(contact.id);
  }

}
