import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from '@angular/fire/firestore';

//Usado para manejar flujos de datos en Angular, en este caso se utiliza para observar los datos en la colección.
import { Observable } from 'rxjs';

//Esta constante define la ruta de la colección en Firestore. En este caso, la colección se llama "contacts".
const PATH = 'contacts';
import { Contact, ContactForm } from '../interfaces/contacts.interface';

/*
Marca la clase ContactsService como un servicio inyectable que estará disponible globalmente en la aplicación, 
lo que significa que Angular creará una única instancia de este servicio para toda la aplicación.
*/
@Injectable({
    providedIn: 'root',
})

export class ContactsService {
    //Utiliza el método inject(Firestore) para obtener una instancia de Firestore.
    private _firestore = inject(Firestore);
    //Hace referencia a la colección "contacts" en Firestore. Esta es la colección 
    //que se utilizará para realizar las operaciones CRUD.
    private _collection = collection(this._firestore, PATH);

    /*
      obtiene todos los contactos de la colección "contacts" y devuelve un Observable de tipo Contact[].
      collectionData: Obtiene los datos de una colección y automáticamente actualiza el observable cuando los datos cambian.
      El parámetro { idField: 'id' } asegura que cada documento tenga un campo id con el valor del ID del documento en Firestore.
    */
    getContacts() {
        return collectionData(this._collection, { idField: 'id' }) as Observable<Contact[]>;
    }

    /*
    Este método obtiene un contacto individual a partir de su ID.
    getDoc: Obtiene un documento específico de Firestore.
    snapshot.data(): Devuelve los datos del documento.
    En caso de error, se retorna undefined.
    */
    async getContact(id: string) {
        try {
            const snapshot = await getDoc(this.document(id));
            return snapshot.data() as Contact;
        } catch (error) {
            //catch error
            return undefined;
        }
    }

    createContact(contact: ContactForm) {
        return addDoc(this._collection, contact);
    }

    updateContact(id: string, contact: ContactForm) {
        return updateDoc(this.document(id), { ...contact });
    }

    deleteContact(id: string) {
        return deleteDoc(this.document(id));
    }

    private document(id: string) {
        return doc(this._firestore, `${PATH}/${id}`);
    }
}