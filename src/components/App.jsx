import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';
import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import css from './ContactForm/ContactForm.module.css';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    // щоб знайти елемент в масиві
    // якщо знайщеться в contact буде об'єкт
    // якщо не здайде - undefind
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    // треба повернути або true або false
    // булеве значення об'єкта - true
    // булеве значення undefind - false
    return Boolean(result);
  };
  const handleAddContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      alert(`${name}: ${number} is already in contacts`);
      return false;
    }
    // що зробити
    const action = addContact({ name, number });
    // dispatch передає action reducer
    dispatch(action);
  };
  const handleDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };
  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filteredContacts.length);
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter handleInputChange={handleFilter} value={filter} />
      {isContacts && (
        <ContactList
          removeContact={handleDeleteContact}
          contacts={filteredContacts}
        />
      )}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );
};
