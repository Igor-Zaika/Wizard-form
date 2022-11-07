import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage as Error, useField  } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { changeLastUpdate } from '../../func';
import Spinner from '../spinner/Spinner';
import ErrorMessage  from '../errorMessage/ErrorMessage';
import { changeSingleUserData, selectAll as  singleData } from '../user/SingleUserSlice'
import { switchForm, changeEditedUserData, selectAll } from '../topOfForm/formsSlice'
import { set, keys, setSingleUser } from '../indexedDB';

import './account.scss';
import close from '../../icons/close.svg';
import plus from '../../icons/add.svg';
import avatar from '../../icons/avatar.svg';
import eye_visibility from '../../icons/visibility.svg';
import eye_offvisibility from '../../icons/offvisibility.svg';

const MyPasswordInput = ({ label, img , ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name} className="account_label">{label}</label>
            <input {...field} {...props} className={meta.touched && meta.error ? props.outlinered : props.outline}/>
            <img {...props} src={props.src} className={props.pic} alt="eye" onClick={img}/>
            {meta.touched && meta.error ? (
            <div className="text_error">{meta.error}</div>
            ) : null}
        </>
    );
};

const Account = () => {
    const allUsers = useSelector(selectAll);
    const single = useSelector(singleData);
    let navigate = useNavigate();
    const location = useLocation();
    const { singleLoadingStatus } = useSelector(state => state.singleUser);
    const dispatch = useDispatch();
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [password, setPassword] = useState(location.pathname === '/userEditing' ? true : false);
    const [repeatPassword, setRepeatPassword] = useState(location.pathname === '/userEditing' ? true : false);
    const [suggestTab, setSuggestTab] = useState(false);

    const initialStore = {
        id: uuidv4(),
        avatar: '',
        name: '',
        password: '',
        repeatpassword: '',
    }

    keys().then((val) => {
        if(val.length > 0 && val.length < 4) {
            setSuggestTab(true)
        }
    })

    const selectContinueForm = () => keys().then((val) => {
        switch (val.length) {
            case 1:
                dispatch(switchForm("profile"));
                break
            case 2:
                dispatch(switchForm("contacts"));
                break
            case 3:
                dispatch(switchForm("capabilities"));
                break
            default: return val
        }
    })

    const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];

    const checkUniqueName = () => {
        return allUsers.map(user => {
            return user.name;
        })
    }

    const togglePasswordVisiblity = (value, setvalue) => {
        setvalue(value ? false : true);   
    };

    const renderAccount = () => {
        return(
            <>  
                {suggestTab && location.pathname === '/userCreation' ? <div 
                                    className="account_frame_description">
                                    <div className="frame_text">You have an unsaved user data. Do you want to complete it?</div>
                                    <div className="frame_continue" onClick={() => selectContinueForm()} >Continue</div>
                                    <img className="frame_close" src={close} alt="close" />
                                </div> : null}
                <Formik
                    initialValues = {location.pathname === '/userEditing' ? single[0] : initialStore}
                    validationSchema={Yup.object({
                        avatar: Yup.mixed()
                            .required('A file is required')
                            .test('FILE_SIZE',
                                'upload file is too big',
                                (value) => !value || (value && value.size <= 1024 * 1024)
                            )
                            .test('FILE_FORMAT',
                                'upload file has unsuported format',
                                (value) => !value || (value && supportedFormats.includes(value.type))
                            ),
                        name: Yup.string()
                            .required("Required field")
                            .max(50, "Too Long!")
                            .test('NAME_FORMAT', 
                                'Name already taken!',
                                (value) => !checkUniqueName().includes(value) || single[0]?.name  === value
                            ),   
                        password: Yup.string()
                            .min(4, "Too Short!")
                            .max(50, "Too Long!")
                            .required("Required field"),
                        repeatpassword: Yup.string()
                            .required("Required field")
                            .oneOf([Yup.ref('password'), null], "passwords don't match")
                    })}
                    onSubmit = {(values, {resetForm}) => {
                        if(location.pathname === '/userEditing') { 
                            setSingleUser('singleUser', values);
                            dispatch(changeSingleUserData(changeLastUpdate(values)));
                            dispatch((changeEditedUserData(changeLastUpdate(values))));
                            navigate(`/${single[0].id}`);                                          
                        } else {
                            set('account', values);
                            dispatch(switchForm("profile"));
                            setTimeout(() => resetForm({
                                avatar: '',
                                name: '',
                                password: '',
                                repeatpassword: '',
                            }), 500)}}
                        }     
                        
                >
                    {({values, setFieldValue, setFieldTouched, errors, touched}) => (
                        <Form className="account_form">
                            <div className="avatar_box">
                                <img className="avatar" src={single.length > 0 ? avatarPreview || single[0].img : avatarPreview || avatar} alt="avatar" />
                                <div className='add_box'>
                                    <img className='plus' src={plus} alt="plus" />
                                    <label htmlFor="avatar"  className="add_avatar" >add avatar</label>
                                </div>
                                <input
                                    className="add_avatar_input"  
                                    type="file"
                                    name="avatar"
                                    onBlur={() => setFieldTouched('avatar', true)} 
                                    onChange={(e) => {
                                        const fileReader = new FileReader();
                                        fileReader.onload = () => {
                                            if (fileReader.readyState === 2) {
                                                setFieldValue('img', fileReader.result);
                                                setAvatarPreview(fileReader.result);
                                            }
                                        };
                                        fileReader.readAsDataURL(e.target.files[0]);
                                        setFieldValue('avatar', e.target.files[0]);
                                    }}
                                />
                                <Error className="text_error_image" name="avatar" component="div"/>
                            </div>
                            <div className="account_inputs_box">
                                <label htmlFor="name"  className="account_label">User name</label>
                                <Field
                                    className={errors.name && touched.name ? "name_red" : "name"} 
                                    type="text" 
                                    name="name"                           
                                />
                                <Error className="text_error" name="name" component="div"/>
                                <div className="password_box">
                                    <MyPasswordInput
                                        label="Password"
                                        outlinered="password_red" 
                                        outline="password"
                                        type={password ? "text" : "password"} 
                                        name="password"
                                        pic="password_eye_visibility"
                                        src={password ? eye_offvisibility : eye_visibility}
                                        img={() => togglePasswordVisiblity(password,setPassword)}
                                    />
                                </div>
                                <div className="repeat_password_box">
                                    <MyPasswordInput
                                        label="Repeat password"
                                        outlinered="repeat_password_red" 
                                        outline="repeat_password"
                                        type={repeatPassword ? "text" : "password"} 
                                        name="repeatpassword"
                                        pic="repeat_password_eye_visibility"
                                        src={repeatPassword ? eye_offvisibility : eye_visibility}
                                        img={() => togglePasswordVisiblity(repeatPassword, setRepeatPassword)}
                                    />
                                </div>
                            </div>
                            {location.pathname === '/userEditing' ? <button className="button_account" type="submit">Save</button> :
                                <button className='button_account' type="submit">Forward</button>
                            }                       
                        </Form>
                    )}
                </Formik>
            </>
        )
    }

    const errorMessage = singleLoadingStatus === "error" ? <ErrorMessage/> : null;
    const spiner = singleLoadingStatus === "loading" ? <Spinner/> : null
    
    return(
        <>
            {errorMessage}
            {spiner}
            {singleLoadingStatus !== 'loading' ? renderAccount() : null}
        </>
    )
}

export default Account;