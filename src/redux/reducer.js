import { ADD_CONTACT, DELETE_CONTACT } from './types';

const initialState = {
  contacts: [],
  filter: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      // створюємо новий масив книг: де всі старі + нова
      const newContacts = [...state.contacts, action.payload];
      // повертаємо store: де є фільтр, а книги перезаписуються
      return { ...state, contacts: newContacts };
    case DELETE_CONTACT:
      const result = state.contacts.filter(item => item.id !== action.payload);
      return { ...state, contacts: result };
    default:
      return state;
  }
};

export default reducer;
