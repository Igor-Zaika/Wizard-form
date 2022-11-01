
import { configureStore } from '@reduxjs/toolkit';
import users from '../components/topOfForm/formsSlice';

const store = configureStore({
  reducer: users,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;