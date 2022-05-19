import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
    email: string;
}

const initialState: IUserState = {
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // On login, save user data into reduce store
        login: (state, action: PayloadAction<IUserState>) => {
            const { email } = action.payload;

            state.email = email;
        },
        // On logout, set state to initialState
        logout: (state) => {
            state.email = '';
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
