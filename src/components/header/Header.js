import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { removeSingleUser, selectAll as  singleData } from '../user/SingleUserSlice'
import { switchForm } from '../topOfForm/formsSlice';

import './header.scss'
import logo from '../../icons/logo.svg';
import user from '../../icons/user.svg'
import users from '../../icons/users.svg'

const Header = () => {
    const { activeIcon } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const single = useSelector(singleData);
    

    const setTabAndClearData = () => {
        dispatch(switchForm("account"));
        if(single[0]){
            dispatch(removeSingleUser(single[0]));
        }
    }

    const clearSingleUser = () => {
        if(single[0]){
            dispatch(removeSingleUser(single[0]));
        }
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
                            onClick={() => clearSingleUser()}
                            >List of users
                        </Link>
                    </nav>
                </header>
                {/* <Outlet/> */}
            </> 
    )
}

export default Header;