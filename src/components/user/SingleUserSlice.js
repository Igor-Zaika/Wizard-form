import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { getSingleUser, clearSingleUser } from '../indexedDB';


const singleUserAdapter = createEntityAdapter(
    {selectedId: (single) => single.id}
);


const initialState = singleUserAdapter.getInitialState({
    singleLoadingStatus: 'idle',
});

export const singleUserData = createAsyncThunk(
    'single/getUser',
    () => {
        return getSingleUser()
    }
);

const singleUserSlice = createSlice({
    name: 'singleUser',
    initialState,
    reducers: {
        removeSingleUser: (state, action) => {
            singleUserAdapter.removeOne(state, action.payload.id);
            clearSingleUser();
        },
        changeSingleUserData: (state, action) => {
            singleUserAdapter.setOne(state, action.payload);     
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(singleUserData.pending, state => {state.singleLoadingStatus = "loading"})
            .addCase(singleUserData.fulfilled, (state, action) => {
                state.singleLoadingStatus = "idle";
                singleUserAdapter.addMany(state, action.payload);
            })
            .addCase(singleUserData.rejected, state => {
                state.singleLoadingStatus = "error";
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = singleUserSlice;

export default reducer;

export const {selectAll} = singleUserAdapter.getSelectors(state => state.singleUser);

export const {
    removeSingleUser,
    changeSingleUserData
} = actions;