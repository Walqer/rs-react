import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import { charactersApi } from '../api/character';

export default configureStore({
  reducer: {
    search: searchReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
});
