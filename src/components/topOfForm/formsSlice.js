import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { getAllList, delUser, setList } from '../indexedDB';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    tabs: [
        {name: 'account', active: true},  
        {name: 'profile', active: false},  
        {name: 'contacts', active: false},
        {name: 'capabilities', active: false}
    ],
    activeIcon: 'user',
    formsLoadingStatus: 'idle',
});

export const usersData = createAsyncThunk(
    'forms/getForms',
    // () => {
    //     return getAllList()
    // }
    (num) => {
        return getAllList().then(request => {
            const end = num * 6;
            const start = (end/num) * (num - 1);
            if(request.length < 6){
                return request;
            } else if(request.length - end > 0){
                return request.slice(start, end);
            } else if(request.length - end <= 0){                  
                return request.slice(start,request.length);
            }
        })
    }
);



const formsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        switchForm: (state, action) => {
            state.tabs.map(tab => {
                tab.name !== action.payload && !tab.active ? tab.active = null : tab.active = null;
                tab.name === action.payload && !tab.active  ? tab.active = 'active' : tab.active = null;
                return tab;
            })  
        },
        switchActiveIcon: (state, action) => {
            state.activeIcon = action.payload
        },
        removeUser: (state, action) => {
            usersAdapter.removeOne(state, action.payload);
            delUser(action.payload)
        },
        setUserData: (state, action) => {
            state.singleUser = action.payload
        },
        changeEditedUserData: (state, action) => {
            usersAdapter.setOne(state, action.payload);
            setList(action.payload.id, action.payload)        
        },
        clearAllListOfUsers: (state) => {
            usersAdapter.removeAll(state);
            // clearUsers();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersData.pending, state => {state.formsLoadingStatus = "loading"})
            .addCase(usersData.fulfilled, (state, action) => {
                state.formsLoadingStatus = "idle";
                usersAdapter.addMany(state, action.payload);
            })
            .addCase(usersData.rejected, state => {
                state.formsLoadingStatus = "error";
            })
            .addDefaultCase(() => {})
    }
});


const {actions, reducer} = formsSlice;

export default reducer;

export const {selectAll} = usersAdapter.getSelectors(state => state.users);

export const {
    switchForm,
    switchActiveIcon,
    removeUser,
    setUserData,
    changeEditedUserData,
    clearAllListOfUsers
} = actions;