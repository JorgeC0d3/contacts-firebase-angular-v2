import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactForm } from '../interfaces/contacts.interface';
import { ContactsService } from '../data-access/contacts.service';

// Declara bootstrap como una variable global
declare var bootstrap: any;

//CreateForm: Esta interfaz define la estructura del formulario de contacto. 
//Cada campo es un FormControl que contiene un valor específico:

export interface CreateForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-contact-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-create.component.html',
  styleUrl: './contact-create.component.css'
})
export class ContactCreateComponent {

  //inject(FormBuilder): Inyecta el servicio FormBuilder que se utiliza para crear el formulario reactivo.
  private _formBuilder = inject(FormBuilder).nonNullable;
  //inject(ContactsService): Inyecta el servicio que se encarga de gestionar los contactos (creación, actualización, etc.).
  private _contactsService = inject(ContactsService);

  //form: Es el formulario reactivo del componente. Utiliza FormBuilder para definir un grupo de controles (FormGroup), 
  //y se asegura de que todos los campos, excepto description, sean obligatorios.
  //Validaciones: Los campos fullName, email y phoneNumber son requeridos. Además, el campo email tiene una validación 
  //adicional para asegurarse de que el valor sea una dirección de correo válida (usando Validators.email).

  form = this._formBuilder.group<CreateForm>({
    
    fullName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
  });

  //Este método se llama cuando el usuario envía el formulario para crear un contacto.
  async createContact() {
    if (this.form.invalid){
      const errorToast = document.getElementById('errorToastData');
      const toast = new bootstrap.Toast(errorToast!);
      toast.show();
      return;
    }

    try {
      const contact = this.form.value as ContactForm;
      await this._contactsService.createContact(contact) 

      // Mostrar toast de éxito
      const successToast = document.getElementById('successToast');
      const toast = new bootstrap.Toast(successToast!);
      toast.show();

      // Resetear el formulario después de crear el contacto
      this.form.reset();

    } catch (error) {
      // Mostrar toast de error
      const errorToast = document.getElementById('errorToast');
      const toast = new bootstrap.Toast(errorToast!);
      toast.show();
    }
  }

}
