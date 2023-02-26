import { useSelector } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

import css from './ContactForm/ContactForm.module.css';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const isContacts = Boolean(filteredContacts.length);
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
      {isContacts && <ContactList contacts={filteredContacts} />}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );
};
