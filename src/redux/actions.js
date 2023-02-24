import { ADD_CONTACT, DELETE_CONTACT } from './types';
import { nanoid } from 'nanoid';

// payload - з чим зробити - це наш контакт
export const addContact = payload => {
  // повертає об'єкт що зробити і з чим зробити
  return {
    //  що зробити?  додати
    type: ADD_CONTACT,
    // з чим зробити - з новим контактом
    payload: {
      id: nanoid(),
      ...payload,
    },
  };
};

export const deleteContact = payload => {
  return {
    type: DELETE_CONTACT,
    payload,
  };
};
