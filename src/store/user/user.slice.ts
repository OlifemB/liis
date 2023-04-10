import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store";


export interface IUserState {
    data: null | string
}

const initialState: IUserState = {
    data: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginIn: (state, action) => {
            state.data = action.payload
        },
        loginOut: (state) => {
            state.data = null;
        }
    }
});

export const selectIsAuth = (state: RootState) => Boolean(state.userReducer.data);
export const userActions= userSlice.actions;
export const userReducer = userSlice.reducer;
