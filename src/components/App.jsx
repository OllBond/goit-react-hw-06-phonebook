import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { addContact, deleteContact } from 'redux/actions';

import css from './ContactForm/ContactForm.module.css';

export const App = () => {
  // дістаємо зі store contacts
  const contacts = useSelector(store => store.contacts);
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // ця ф-я спрацьовує вдруге, коли в масив додається щось або видаляється
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    // щоб знайти елемент в масиві
    // якщо знайщеться в contact буде об'єкт
    // якщо не здайде - undefind
    const result = contacts.find(({ name }) => {
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
  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    // якщо фільтр пустий - повертати масив контактів не фільтрувати
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        // якщо у name є ці кілька літер - вертає true
        name.toLowerCase().includes(normalizedFilter) ||
        // або якщо у number є ці кілька цифр - вертає true
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  };
  const filteredContacts = getFilteredContacts();
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
