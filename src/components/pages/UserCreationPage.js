import { useSelector, useDispatch  } from 'react-redux';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { getAllList } from '../indexedDB'
import { selectAll as  singleData, removeSingleUser} from '../user/SingleUserSlice'
import { switchActiveIcon, setAllUsersIndexeDB } from '../topOfForm/formsSlice';
import TopOfForm from '../topOfForm/TopOfForm';
import Account from '../account/Account';
import Profile from '../profile/Profile';
import Contacts from '../contacts/Contacts';
import Capabilities from '../capabilities/Capabilities';

const UserCreation = () => {
    const location = useLocation();
    const { tabs }  = useSelector(state => state.users);
    const dispatch = useDispatch();
    const single = useSelector(singleData);
    
    useEffect(() => {
        dispatch(switchActiveIcon('user'));
        if(location.pathname === '/wizard-form/userCreation' && single[0]){
            dispatch(removeSingleUser(single[0]));
        }
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