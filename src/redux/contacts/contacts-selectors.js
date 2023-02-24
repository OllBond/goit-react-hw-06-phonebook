// дістаємо зі store contacts
export const getAllContacts = store => store.contacts;
// відфільтровані контакти
export const getFilteredContacts = ({ contacts, filter }) => {
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
export const getFilter = ({ filter }) => filter;