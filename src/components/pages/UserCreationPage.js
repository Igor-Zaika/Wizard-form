import { useSelector } from 'react-redux';
import {  useDispatch } from 'react-redux'
import { useEffect } from "react";

import { switchActiveIcon } from '../topOfForm/formsSlice'
import TopOfForm from '../topOfForm/TopOfForm';
import Account from '../account/Account';
import Profile from '../profile/Profile';
import Contacts from '../contacts/Contacts';
import Capabilities from '../capabilities/Capabilities';

const UserCreation = () => {
    const { tabs }  = useSelector(state => state.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(switchActiveIcon('user'));
        // eslint-disable-next-line
    },[]);

    return(
        <div className='page'>
            <h1>Adding new user</h1>
            <TopOfForm/>           
            {tabs[0].active ? <Account/> : null}
            {tabs[1].active ? <Profile/> : null}
            {tabs[2].active ? <Contacts/> : null}
            {tabs[3].active ? <Capabilities/> : null}
            
        </div>
    );
}

export default UserCreation;