import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'


import TopOfForm from '../topOfForm/TopOfForm';
import Account from '../account/Account';
import Profile from '../profile/Profile';
import Contacts from '../contacts/Contacts';
import Capabilities from '../capabilities/Capabilities';
import arrow from '../../icons/menu.svg'

const UserEditing = () => {
    const { tabs } = useSelector(state => state);
    
    let navigate = useNavigate();
    // const dispatch = useDispatch();
    
    return(
        <>
            <div className="title_box"> 
                <img  className="users_lists_arrow" src={arrow} alt="arrow" />
                <div className="users_lists_text" onClick={() => navigate(-1)}>Users Profile</div>
                <h1 className="editing_title">Editing</h1>
            </div>
            <TopOfForm/>
            {tabs[0].active ? <Account/> : null}
            {tabs[1].active ? <Profile/> : null}
            {tabs[2].active ? <Contacts/> : null}
            {tabs[3].active ? <Capabilities/> : null}
        </>
    )
}

export default UserEditing;