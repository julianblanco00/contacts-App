import { Contact } from './contact.interface';

export interface TableData {
    columns: string[];
    contactsIds: string[];
    contacts: Contact;
}