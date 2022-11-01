import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearSingleUserData, switchForm } from '../topOfForm/formsSlice';

import './header.scss'
import logo from '../../icons/logo.svg';
import user from '../../icons/user.svg'
import users from '../../icons/users.svg'

const Header = () => {
    const { activeIcon } = useSelector(state => state);
    const dispatch = useDispatch();

    const setTabAndClearData = () => {
        dispatch(clearSingleUserData());
        dispatch(switchForm("account"));
    }

    return(
            <>
                <header className='header'>
                    <img className='nav__logo' src={logo} alt='logo' />
                    <nav className={activeIcon === "user" ? "add_new_user_box_active" : "add_new_user_box"}>
                        <img className='user' src={user} alt='users'/>
                        <Link
                            to="/userCreation" 
                            className="new_user"
                            onClick={() => setTabAndClearData()}
                            >Add new user
                        </Link>
                    </nav>
                    <nav className={activeIcon === "list" ? "list_of_users_box_active" : "list_of_users_box"}>
                        <img className='users' src={users} alt='user'/>
                        <Link 
                            to="/" 
                            className="list_users"
                            >List of users
                        </Link>
                    </nav>
                </header>
                {/* <Outlet/> */}
            </> 
    )
}

export default Header;