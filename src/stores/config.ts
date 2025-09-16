import { configureStore } from '@reduxjs/toolkit';
import toasterSlice from './toasterSlice';


export const store = configureStore({
    reducer: {
        toaster: toasterSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
