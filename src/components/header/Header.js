import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { switchForm } from '../topOfForm/formsSlice';

import './header.scss'
import logo from '../../icons/logo.svg';
import user from '../../icons/user.svg'
import users from '../../icons/users.svg'

const Header = () => {
    const { activeIcon } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const setTabAndClearData = () => {
        dispatch(switchForm("account"));   
        setTimeout(() => {
            clearSingleUser();
        },200)
    }

    const clearSingleUser = () => {
        setTimeout(() => {
            clearSingleUser();
        },200)
    }

    return(
        <header className='header'>
            <img className='nav__logo' src={logo} alt='logo' />
            <nav className={activeIcon === "user" ? "add_new_user_box_active" : "add_new_user_box"}>
                <img className='user' src={user} alt='users'/>
                <Link
                    to="/wizard-form/userCreation" 
                    className="new_user"
                    onClick={() => setTabAndClearData()}
                    >Add new user
                </Link>
            </nav>
            <nav className={activeIcon === "list" ? "list_of_users_box_active" : "list_of_users_box"}>
                <img className='users' src={users} alt='user'/>
                <Link 
                    to="/wizard-form" 
                    className="list_users"
                    onClick={() => clearSingleUser()}
                    >List of users
                </Link>
            </nav>
        </header>
    )
}

export default Header;