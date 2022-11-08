import { Link } from 'react-router-dom'

import './noUsers.scss'

const NoUsers = () => {
    return(
        <div className="no_users_wrapp">
            <div className="users_content">No users here :(</div>
            <Link to="/Wizard-form/userCreation"> <button className='button_create_user'>Create new user</button> </Link>
        </div>
    );
}

export default NoUsers;