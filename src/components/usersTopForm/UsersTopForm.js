import './usersTopForm.scss'

const UsersTopForm = () => {

    return(
        <>
            <h1>Lists of users</h1>
            <div className="top_users_form">
                <div className="users_name">name</div>
                <div className="users_company">company</div>
                <div className="users_contacts">contacts</div>
                <div className="users_last_update">last update</div>
            </div>
        </>
    );
}

export default UsersTopForm;