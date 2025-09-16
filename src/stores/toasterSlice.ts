import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the toaster state
interface ToasterState {
    message: string | null;
    severity: 'success' | 'error' | 'warning' | 'info';
}

// Define the initial state
const initialState: ToasterState = {
    message: null,
    severity: 'info',
};

export const toasterSlice = createSlice({
    name: 'toaster',
    initialState,
    reducers: {
        setToaster: (state, action: PayloadAction<{ message: string; severity: ToasterState['severity'] }>) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        clearToaster: (state) => {
            state.message = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setToaster, clearToaster } = toasterSlice.actions;

export default toasterSlice.reducer;