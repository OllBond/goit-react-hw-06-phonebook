import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './contacts-actions';

const contactsReducer = createReducer([], {
  // payload - деструктуризація action
  // з цієї ф-ї повертаємо нове значення store
  [addContact]: (state, { payload }) => {
    state.push(payload);
  },
  [deleteContact]: (state, { payload }) =>
    state.filter(item => item.id !== payload),
});

export default contactsReducer;
