
import { configureStore } from '@reduxjs/toolkit';
import users from '../components/topOfForm/formsSlice';
import singleUser from '../components/user/SingleUserSlice';

const store = configureStore({
  reducer: {users, singleUser},
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;