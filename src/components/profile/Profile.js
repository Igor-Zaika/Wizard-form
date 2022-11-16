import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage as Error, useField } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeLastUpdate } from '../../func';
import Spinner from '../spinner/Spinner';
import ErrorMessage  from '../errorMessage/ErrorMessage';
import { changeSingleUserData, selectAll as  singleData } from '../user/SingleUserSlice'
import { switchForm, changeEditedUserData, selectAll } from '../topOfForm/formsSlice'
import { set, keys, setSingleUser } from '../indexedDB';

import './profile.scss'

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name} className={props.className}>{label}</label>
            <input {...field} {...props} className={meta.touched && meta.error ? "profile_input_red" : "profile_input"}/>
            {meta.touched && meta.error ? (
            <div className="text_error">{meta.error}</div>
            ) : null}
        </>
    );
};

const Profile = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    const { singleLoadingStatus } = useSelector(state => state.singleUser);
    const allUsers = useSelector(selectAll);
    const single = useSelector(singleData);
    const [profileName, setProfileName] = useState(true);
    
    useEffect(() => {
        keys().then((val) => {
            if(val.length > 0) {
                setProfileName(false)
            }
        })
    },[])

    const checkUniqueEmail = (arr) => {
        return arr.map(user => {
            return user.email;
        })
    }

    const initialStore = {
        firstname:'',
        lastname: '',
        dateofbirth: '',
        email: '',
        adress: '',
        gender: ''
    }

    const renderProfile = () => {
        return(
            <Formik 
                initialValues={location.pathname === '/wizard-form/userEditing' ? single[0] : initialStore}
                validationSchema={Yup.object({
                    firstname: Yup.string()
                        .max(50, "Too Long!")
                        .required("Required field"),
                    lastname: Yup.string()
                        .max(50, "Too Long!")
                        .required("Required field"),
                    dateofbirth: Yup.date()
                        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
                        .required("Please enter your age"),
                    email: Yup.string()
                        .email("Invalid email")
                        .max(50, "Too Long!")
                        .required("Required field")
                        .test('EMAIL_FORMAT', 
                            'Email already taken!',
                            (value) => !checkUniqueEmail(allUsers).includes(value) || single[0]?.email  === value
                        ), 
                    adress: Yup.string()
                        .max(50, "Too Long!"),
                    gender: Yup.mixed().required("Required field"),
                })}
                onSubmit = {(values, {resetForm}) => {
                    if(location.pathname === '/wizard-form/userEditing') {
                        setSingleUser('singleUser', values);
                        dispatch(changeSingleUserData(changeLastUpdate(values)));
                        dispatch((changeEditedUserData(changeLastUpdate(values))));
                        navigate(`/wizard-form/${single[0].id}`);
                    } else {
                        set('profile', values)
                        dispatch(switchForm("contacts"))
                        setTimeout(() => resetForm({
                            firstname: '',
                            lastname: '',
                            dateofbirth: '',
                            email: '',
                            adress: '',
                            gender: ''
                        }), 500)
                    }
                }}>
                {({ values, setFieldValue, errors, touched }) =>(
                    <Form className="profile_form">
                        <div className="profile_first_box">
                            <MyTextInput
                                className="profile_label_star"
                                label="First name"
                                name="firstname"
                                type="text"
                            />
                            <MyTextInput
                                className="profile_label_star"
                                label="Last name"
                                name="lastname"
                                type="text"
                            />
                            <label htmlFor="dateofbirth" className="lable_birth_date" >Birth date</label>
                            <DatePicker 
                                className={errors.dateofbirth && touched.dateofbirth ? "calendar_red" : "calendar"}
                                type="data" 
                                placeholderText="MM/DD/YYY"
                                name="dateofbirth" 
                                selected={values.dateofbirth}
                                onChange={(date) => setFieldValue('dateofbirth', date)}
                            />
                            <Error className="text_error" name="dateofbirth" component="div"/>
                        </div>
                        <div className="profile_second_box">
                            <MyTextInput
                                className="profile_label_star"
                                label="Email"
                                name="email"
                            />
                            <MyTextInput
                                className="profile_label"
                                label="Adress"
                                name="adress"
                                type="text"
                            />
                            <div className="gender" id="my-radio-group">Gender</div>
                            <div className="radio_group" role="group" aria-labelledby="my-radio-group">
                                <label className="gender_label">
                                    <Field type="radio" name="gender" value="Male" />
                                    Male
                                </label>
                                <label className="gender_label">
                                    <Field style={{marginLeft: '43px'}} type="radio" name="gender" value="Female" />
                                    Female
                                </label>
                            </div>
                            <Error className="text_error" name="gender" component="div"/>
                        </div>
                        {location.pathname === '/wizard-form/userEditing' ? <button type="submit" className='button_account'>Save</button> :
                            <>
                                <button onClick={() => dispatch(switchForm("account"))} className='button_back' >Back</button>
                                <button type="submit" className='button_forward' disabled={ profileName }>Forward</button>
                            </>
                        }                  
                        {profileName && location.pathname === '/wizard-form/userCreation' ? <div className="text_error_button">Fill out the previous form</div> : null}
                    </Form>
                )}
            </Formik>
        )
    }

    const errorMessage = singleLoadingStatus === "error" ? <ErrorMessage/> : null;
    const spiner = singleLoadingStatus === "loading" ? <Spinner/> : null
    
    return(
        <>
            {errorMessage}
            {spiner}
            {singleLoadingStatus !== 'loading' ? renderProfile() : null}
        </>
    )
}

export default Profile