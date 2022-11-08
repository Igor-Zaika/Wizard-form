import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, ErrorMessage, useField } from 'formik';
import InputMask from "react-input-mask";
import Select from 'react-select';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {set, keys, setSingleUser} from '../indexedDB';

import { changeLastUpdate } from '../../func';
import { changeSingleUserData, selectAll as  singleData } from '../user/SingleUserSlice'
import { switchForm, changeEditedUserData } from '../topOfForm/formsSlice';
import './contacts.scss';
import minus from '../../icons/minus.svg';
import plus from '../../icons/add.svg';

const MyContactInput = ({ label, inputmask, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name} className={props.className}>{label}</label>
            {inputmask ? <InputMask {...field} {...props}
                            mask="+7\ (999) 999-99-99" 
                            maskChar="X"
                            name={props.name}
                            className="contacts_input"/> : 
                        <input {...field} {...props} 
                            className={meta.touched && meta.error ? "contacts_input_red" : "contacts_input"}/>}
            {meta.touched && meta.error ? (
            <div className="text_error">{meta.error}</div>
            ) : null}
        </>
    );
};

const Contacts = () => {
    let navigate = useNavigate();
    const single = useSelector(singleData);
    const dispatch = useDispatch(); 
    const location = useLocation();
    const [phoneNumber, setPhoneNumber] = useState(checkAmountPhones());
    const [contactsName, setContactsName] = useState(true);

    function checkAmountPhones() {
        if(single.length > 0 && single.phone3) {
            return 3;
        } else if(single.length > 0 && single.phone2) {
            return 2;
        } else {
            return 1;
        }
    }

    keys().then((val) => {
        if(val.length > 1) {
            setContactsName(false)
        }
    })

    const onDeletePhone = () => {
        if(phoneNumber > 1) {
            setPhoneNumber(phoneNumber - 1)
        }
    }

    const onAddPhone = () => {
        if(phoneNumber < 3) {
            setPhoneNumber(phoneNumber + 1)
        }
    }

    const renderPhoneNumbers = () => {
        let inputPhone = [];

        for(let i = 0; i < phoneNumber; i++) {
            inputPhone.push(
                <div className="phone_box" key={i}>
                    <MyContactInput 
                        inputmask={true}
                        label={`Phone#${i + 1}`}
                        className="contacts_label"
                        name={`phone${i + 1}`}
                    />
                    <img className="contacts_minus" src={minus} alt="minus" onClick={() => onDeletePhone()}/>
                </div>
            ) 
        }
        return inputPhone;
    }

    const options = [
        { value: "English, EN", label: "English, EN" },
        { value: "French, FR", label: 'French, FR' },
        { value: "Spanish, SP", label: 'Spanish, SP' },
        { value: "Arabic, AR", label: 'Arabic, AR' },
        { value: "Mandarin, CMN", label: 'Mandarin, CMN' },
        { value: "Russian, RU", label: 'Russian, RU' },
        { value: "Portuguese, PT", label: 'Portuguese, PT' },
        { value: "German, DE", label: 'German, DE' },
        { value: "Japanese, JA", label: 'Japanese, JA' },
        { value: "Hindi, HI", label: 'Hindi, HI' },
        { value: "Malay, MS", label: 'Malay, MS' },
        { value: "Persian, FA", label: 'Persian, FA' },
        { value: "Swahili, SW", label: 'Swahili, SW' },
        { value: "Tamil, TA", label: 'Tamil, TA' },
        { value: "Italian, IT", label: 'Italian, IT' },
        { value: "Dutch, NL", label: 'Dutch, NL' },
        { value: "Bengali, BN", label: 'Bengali, BN' },
        { value: "Turkish, TR", label: 'Turkish, TR' },
        { value: "Vietnamese, VI", label: 'Vietnamese, VI' },
        { value: "Polish, PL", label: 'Polish, PL' },
        { value: "Javanese, JV", label: 'Javanese, JV' },
        { value: "Punjabi, PA", label: 'Punjabi, PA' },
        { value: "Thai, TH", label: 'Thai, TH' },
        { value: "Korean, KO", label: 'Korean, KO' },
    ]

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: '#fff',
            borderStyle: 'none',
            borderRadius: 0,
            borderColor: 'none',
            boxShadow: 'none',
            fontFamily: "Roboto",
            fontWeight: 500,
            color: '#000000'
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: "172px",
           "::-webkit-scrollbar": {
                width: "2px",
                height: "42px",
            },
            "::-webkit-scrollbar-thumb": {
                background: "#C1CFE0"
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),
        option: (provided, state) => {
            return {
                ...provided,
                color: '#657C9A',
                backgroundColor: state.isFocused ? '#E7F0FF' : 'white',
            };
        },
        dropdownIndicator: (provided) => ({...provided, display: 'none'}),
        indicatorSeparator: (provided) => ({...provided, display: 'none'}),
        indicatorsContainer: (provided) => ({...provided, display: 'none'}),
    };

    const initialStore = {
        company: '',
        github: '',
        facebook: '',
        language: '',
        fax: '',
        phone1: '',
        phone2: '',
        phone3: ''
    }

    return (
        <Formik
            initialValues={single.length > 0 && location.pathname === '/Wizard-form/userEditing' ? single[0] : initialStore}
            validationSchema={Yup.object().shape({
                company: Yup.string()
                    .max(50, "Too Long!")
                    .required("Required field"),
                github: Yup.string()
                    .max(50, "Too Long!"),
                facebook: Yup.string()
                    .max(50, "Too Long!"),
                language: Yup.object().required("Required field").nullable(),
                fax: Yup.string(),
            })}
            onSubmit = {(values, {resetForm}) => {
                if(location.pathname === '/Wizard-form/userEditing') {
                    setSingleUser('singleUser', values)
                    dispatch(changeSingleUserData(changeLastUpdate(values)));
                    dispatch((changeEditedUserData(changeLastUpdate(values))));
                    navigate(`/Wizard-form/${single[0].id}`);
                } else {
                    set('contacts', values)
                    dispatch(switchForm("capabilities"))
                    setTimeout(() => resetForm({
                        company: '',
                        github: '',
                        facebook: '',
                        language: '',
                        fax: '',
                        phone1: '',
                        phone2: '',
                        phone3: '',
                    }), 500)
                }
            }}>
            {({ values, setFieldValue, errors, setFieldTouched, touched }) => (
                <Form className="contacts_form">
                    <div className="contacts_box_first">
                        <MyContactInput 
                            label="Company"
                            className="contacts_label_star"
                            type="text"
                            name="company"
                        />
                        <MyContactInput 
                            label="Github link"
                            className="contacts_label"
                            type="text"
                            name="github"
                        />
                        <MyContactInput 
                            label="Facebook link"
                            className="contacts_label"
                            type="text"
                            name="facebook"
                        />
                        <label htmlFor="language" className="contacts_label_star">Main language</label>
                        <Select
                            styles={customStyles}
                            onBlur={() => setFieldTouched('language', true)}
                            onChange={option => setFieldValue('language', option)}
                            options={options} 
                            placeholder=""
                            className={errors.language && touched.language ? 'contacts_select_red' : 'contacts_select'}
                            name="language"
                            value={values.language}
                        />
                        <ErrorMessage className="text_error" name="language" component="div"/>
                    </div>
                    <div className="contacts_box_second">
                        <MyContactInput 
                            inputmask={true}
                            label="Fax"
                            className="contacts_label"
                            name="fax"
                        />
                        {renderPhoneNumbers()}
                        <div onClick={() => onAddPhone()} className="add_phone"> <img src={plus} alt="plus" /> add phone number</div>
                    </div>
                    {single.length > 0 && location.pathname === '/Wizard-form/userEditing' ? <button type="submit" className='button_account'>Save</button> :
                        <>
                           <button onClick={() => dispatch(switchForm("profile"))} className='button_contacts_back' >Back</ button>
                            <button disabled={ contactsName } type="submit" className='button_contacs_forward' >Forward</button>
                        </>
                    }                   
                    {contactsName && single.length === 0 ? <div className="text_error_button">Fill out the previous form</div> : null}
                </Form>
            )}
            
        </Formik>
    )
}

export default Contacts;