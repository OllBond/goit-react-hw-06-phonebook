import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-slice';
import { getAllContacts } from 'redux/contacts/contacts-selectors';

import initialState from './initialState';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const [state, setState] = useState({ ...initialState });

  const allContacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  // target - це деструктуризація event
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

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

  const handleSubmit = e => {
    e.preventDefault();

    if (isDublicate({ name, number })) {
      alert(`${name}: ${number} is already in contacts`);
      return setState({ ...initialState });
    }
    // що зробити
    const action = addContact({ name, number });
    // dispatch передає action reducer
    dispatch(action);

    setState({ ...initialState });
  };

  const { name, number } = state;
  return (
    <div className={css.wrapper}>
      <div className={css.contactFormBlock}>
        <form className="" onSubmit={handleSubmit}>
          <div className={css.conactFormGroup}>
            <label className={css.label}>Name</label>
            <input
              className={css.input}
              // зв'язок інпуту і state
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className={css.conactFormGroup}>
            <label className={css.label}>Number</label>
            <input
              className={css.input}
              // зв'язок інпуту і state
              value={number}
              onChange={handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button className={css.btnAddContact} type="submit">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
