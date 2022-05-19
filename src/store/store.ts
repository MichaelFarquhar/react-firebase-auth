import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userSlice from './user/userSlice';

export const store = configureStore({
    reducer: {
        userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
