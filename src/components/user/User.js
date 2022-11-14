
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { setSingleUser } from '../indexedDB';
import { switchForm, usersData, selectAll, switchActiveIcon } from '../topOfForm/formsSlice'
import { removeSingleUser, singleUserData, selectAll as singleData } from '../user/SingleUserSlice'
import arrow from '../../icons/menu.svg'
import edit from '../../icons/edit.png'
import avatar from '../../icons/avatar.svg';
import './user.scss'

const User = () => {
    
    const dispatch = useDispatch();
    const allUsers = useSelector(selectAll);
    const single = useSelector(singleData);
    const userId = useParams();
    const user = allUsers.filter(user => user.id === userId.userId);
    const isLoading = useSelector(state => state.users.formsLoadingStatus);

    setSingleUser('singleUser', user[0]);

    useEffect(() => {
        if(!single[0]){
            dispatch(singleUserData());
        }
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        if(user.length === 0){   
            dispatch(usersData(1));   
        }
        // eslint-disable-next-line
    }, []);

    const formatDate = (date) => {
        return [
            date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            date.getMonth() + 1 < 10 ? '0' + Number(date.getMonth() + 1) : date.getMonth() + 1,
            date.getFullYear()
        ].join('.');
    }
    
    const formatValues = (arr) => {
        let skills = []
        arr.map(val => {
            return skills.push(val.value)
        })
        return skills.join('.\n')
    }

    const upFirstLetter = (name) => {
       return name.charAt(0).toUpperCase() + name.slice(1)
    }

    const delSingleUser = () => {
        setTimeout(() => {
            dispatch(removeSingleUser(user[0]));
        },500)
    }

    const renderSingleUser = () => {
        return <>
            <div className="title_box"> 
                <img  className="users_lists_arrow" src={arrow} alt="arrow" />
                <Link 
                    onClick={() => delSingleUser(user)}
                    to="/wizard-form" 
                    className="users_lists_text"
                >Users lists </Link>
                <h1 className="user_title">User name</h1>
            </div> 
            <div className="user_form">
                <div className="wrapper_user_data">
                    <div className="photo_side">
                        <img className={user[0]?.img ? "user_photo" : "user_photo_avatar"} src={user[0]?.img || avatar} alt="user"/>
                    </div>
                    <div className="description_side">
                        <div className="account_field">
                            <div className="user_box_one">
                                <div className="user_field_title">Account</div>
                                <Link to="/wizard-form/userEditing"
                                    onClick={() => dispatch(switchForm("account"))}>
                                    <img className="user_field_edit" src={edit} alt="edit" /></Link>
                            </div>
                            <div className="user_box_two">
                                <div className="user_box">
                                    <div className="first_point">User name:</div>
                                    <div className="data_user_first">{user[0]?.name ? upFirstLetter(user[0]?.name) : null}</div>
                                </div>
                                <div className="user_box">
                                    <div className="second_point">Password:</div>
                                    <div className="data_user_second">{user[0]?.password}</div>
                                </div>          
                            </div>
                        </div>
                        <div className="personal_field">
                            <div className="user_box_one">
                                <div className="user_field_title">Personal</div>
                                <Link to="/wizard-form/userEditing" onClick={() => dispatch(switchForm("profile"))}><img className="user_field_edit" src={edit} alt="edit" /></Link>
                            </div>
                            <div className="user_box_two">
                                <div className="user_box">
                                    <div className="first_point">First name:</div>
                                    <div className="data_user_first">{user[0]?.firstname ? upFirstLetter(user[0]?.firstname) : null}</div>
                                </div>
                                <div className="user_box">
                                    <div className="second_point">Last name:</div>
                                    <div className="data_user_second">{user[0]?.lastname ? upFirstLetter(user[0]?.lastname) : null}</div>
                                </div>
                                <div className="user_box">
                                    <div className="second_point">Birth date:</div>
                                    <div className="data_user_second">{user[0]?.dateofbirth ? formatDate(user[0].dateofbirth) : null}</div>
                                </div>
                                <div className="user_box">
                                    <div className="second_point">Email:</div>
                                    <div className="data_user_second">{user[0]?.email}</div> 
                                </div>
                                <div className="user_box">
                                    <div className="second_point">Adress:</div>
                                    <div className="data_user_second">{user[0]?.adress}</div>
                                </div>
                                <div className="user_box">
                                    <div className="second_point">Gender:</div>
                                    <div className="data_user_second">{user[0]?.gender}</div>
                                </div>
                            </div> 
                        </div>
                        <div className="contacts_field">
                            <div className="user_box_one">
                                <div className="user_field_title">Contacts</div>
                                <Link to="/wizard-form/userEditing" onClick={() => dispatch(switchForm("contacts"))}><img className="user_field_edit" src={edit} alt="edit" /></Link>
                            </div>
                            <div className="user_box_two">
                                <div className="user_box">
                                    <div className="first_point">Company:</div>
                                    <div className="data_user_first">{user[0]?.company}</div> 
                                </div>
                                {user[0]?.github ? <div className="user_box">
                                    <div className="second_point">Fax:</div>
                                    <div className="data_user_second">{user[0]?.github}</div>
                                </div> : null}
                                {user[0]?.facebook ? <div className="user_box">
                                    <div className="second_point">Fax:</div>
                                    <div className="data_user_second">{user[0]?.facebook}</div>
                                </div> : null}
                                <div className="user_box">
                                    <div className="second_point">Language:</div>
                                    <div className="data_user_second">{user[0]?.language.value}</div>
                                </div>
                                {user[0]?.fax ? <div className="user_box">
                                    <div className="second_point">Fax:</div>
                                    <div className="data_user_second">{user[0]?.fax}</div>
                                </div> : null}
                                {user[0]?.phone1 ? 
                                <div className="user_box">
                                    <div className="second_point">Phone #1:</div>
                                    <div className="data_user_second">{user[0]?.phone1}</div>
                                </div> : null}
                                {user[0]?.phone2 ? 
                                <div className="user_box">
                                    <div className="second_point">Phone #2:</div>
                                    <div className="data_user_second">{user[0]?.phone2}</div>
                                </div> : null}
                                {user[0]?.phone3 ? 
                                <div className="user_box">
                                    <div className="second_point">Phone #3:</div>
                                    <div className="data_user_second">{user[0]?.phone3}</div>
                                </div> : null}
                            </div>                          
                        </div>
                        <div className="capabilities_field">
                            <div className="user_box_one">
                                <div className="user_field_title">Capabilities</div>
                                <Link to="/wizard-form/userEditing" onClick={() => dispatch(switchForm("capabilities"))}><img className="user_field_edit" src={edit} alt="edit"/></Link>
                            </div>
                            <div className="user_box_two">
                                <div className="user_box">
                                    <div className="first_point">Skills:</div>
                                    <div className="data_user_first">{user[0]?.skills ? formatValues(user[0]?.skills) : null}</div>                            
                                </div>
                                {user[0]?.info ? 
                                    <div className="user_box">
                                        <div className="second_point">Information:</div>
                                        <div className="data_user_second">{user[0]?.info}</div>
                                    </div> : null}
                                {user[0]?.hobies.length > 0 ? 
                                    <div className="user_box">
                                        <div className="second_point">Hobies:</div>
                                        <div className="data_user_second">{user[0]?.hobies.join('.')}</div>
                                    </div> : null}
                            </div>                        
                        </div>
                    </div>                   
                </div>             
            </div>
        </>
    }

    const errorMessage = isLoading === "error"  ? <ErrorMessage/> : null;
    const spiner = isLoading === "loading"  ? <Spinner/> : null
    
    return(
        <>
            {/* {errorMessage} */}
            {/* {spiner} */}
            {renderSingleUser()}
        </>
    )
}

export default User;