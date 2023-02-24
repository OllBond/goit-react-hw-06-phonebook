import { createReducer } from '@reduxjs/toolkit';

import { setFilter } from './filter-actions';

// _ це означає - тут має ьути аргумент але він нам не потрібен
const filterReducer = createReducer('', {
  [setFilter]: (_, { payload }) => payload,
});
export default filterReducer;
