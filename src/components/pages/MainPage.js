import { useEffect, useSelector } from "react";
import {  useDispatch } from 'react-redux'
import { selectAll, switchActiveIcon, usersData } from '../topOfForm/formsSlice'

import AccountList from "../accountList/AccountList";
import Header from "../header/Header";
import UsersTopForm from "../usersTopForm/UsersTopForm"
import NoUsers from "../noUsers/NoUsers";

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(usersData());
        dispatch(switchActiveIcon('list'));
        // eslint-disable-next-line
    },[])
    
    return(
        <div className="page">
            {/* <Header/> */}
            <UsersTopForm/>
            <AccountList/>
        </div>
    );
}

export default MainPage;