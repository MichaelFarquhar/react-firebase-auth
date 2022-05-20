import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
    email: string;
    username: string;
    name: string;
}

const initialState: IUserState = {
    email: '',
    username: '',
    name: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // On login, save user data into reduce store
        login: (state, action: PayloadAction<IUserState>) => {
            const { email, username, name } = action.payload;

            state.email = email;
            state.username = username;
            state.name = name;
        },
        // On logout, set state to initialState
        logout: (state) => {
            state.email = '';
            state.username = '';
            state.name = '';
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
