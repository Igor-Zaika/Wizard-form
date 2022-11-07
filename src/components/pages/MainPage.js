import { useEffect } from "react";
import {  useDispatch } from 'react-redux'
import { switchActiveIcon } from '../topOfForm/formsSlice'

import AccountList from "../accountList/AccountList";
import UsersTopForm from "../usersTopForm/UsersTopForm"

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(switchActiveIcon('list'));
        // eslint-disable-next-line
    },[])
    
    return(
        <div className="page">
            <UsersTopForm/>
            <AccountList/>
        </div>
    );
}

export default MainPage;