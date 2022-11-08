import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { changeLastUpdate } from '../../func';
import { clear, set, keys, setList, getAll, setSingleUser } from '../indexedDB';
import { changeSingleUserData, selectAll as  singleData } from '../user/SingleUserSlice'
import { switchForm, changeEditedUserData } from '../topOfForm/formsSlice';
import './capabilities.scss';

const MyCheckbox = ({ children, ...props }) => {
    const [field] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className="checkbox_wrapp">
                <Field {...field} {...props}
                    className="capabilities_input" 
                    type="checkbox"
                    name={props.name}
                    value={props.value}
                />
                {children}
            </label>
        </>
    );
};

const Capabilities = () => {
    let navigate = useNavigate();
    const single = useSelector(singleData);
    const dispatch = useDispatch();
    const location = useLocation();

    const [capabilitiesName, setCapabilitiesName] = useState(true);
    
    keys().then((val) => {
        if(val.length > 2) {
            setCapabilitiesName(false)
        }
    })

    const skills = [
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "Javascript", label: "Javascript" },
        { value: "React", label: "React" },
        { value: "Angular", label: "Angular" },
        { value: "jQuery", label: "jQuery" },
        { value: "NodeJS", label: "NodeJS" },
        { value: "Python", label: "Python" },
        { value: "PHP", label: "PHP" },
        { value: "Ruby On Rails", label: "Ruby On Rails" },
        { value: "SQL", label: "SQL" },
        { value: "BackboneJS", label: "BackboneJS" },
        { value: "Web Design", label: "Web Design" },
        { value: "Project management", label: "Project management" },
        { value: "Git", label: "Git" },
        { value: "Docker", label: "Docker" },
        { value: "AWS Lambda", label: "AWS Lambda" },
        { value: "Firebase", label: "Firebase" },
    ]

    const validationRules = Yup.object().shape({
        skills: Yup.array().min(3, "Required field must have at least min 3 items"),
        info: Yup.string().max(300, "Max length 300 letter"),
        checked: Yup.array(),
    });

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 0,
        })
    }

    const createUser = (allForms) => {
        let user = {}
        allForms.forEach(form => user = {...user, ...form})
        return user;
    }

    const getAllFormsData = () => getAll().then((request) => {
        return setList(request[0].id, createUser(request))
    })

    const initialStore = {
        skills:[],
        info: '',
        hobies: [],
        update: Date.now()
    }

    return(
        <Formik
            initialValues={single.length > 0 && location.pathname === '/Wizard-form/userEditing' ? single[0] : initialStore}
            validationSchema={validationRules}
            onSubmit = {(values, {resetForm}) => {
                if(location.pathname === '/Wizard-form/userEditing') {
                    setSingleUser('singleUser', values);
                    dispatch(changeSingleUserData(changeLastUpdate(values)));
                    dispatch((changeEditedUserData(changeLastUpdate(values))));
                    navigate(`/Wizard-form/${single[0].id}`);
                } else {
                    set('capabilities', values);
                    getAllFormsData();
                    clear();
                    dispatch(switchForm("account"));
                    setTimeout(() => resetForm({
                        skills:[],
                        info: '',
                        hobies: [],
                    }), 500)
                }
            }}> 
            {({ values, setFieldValue, errors, setFieldTouched, touched }) => (
                <Form className="capabilities_form">
                    <div className="capabilities_box">
                        <div className="skills_wrapp">
                            <label htmlFor="skills" className="lable_skills">Skills</label>
                            <Select 
                                styles={customStyles}
                                onBlur={() => setFieldTouched('skills', true)}
                                onChange={option => setFieldValue('skills', option)}
                                value={values.skills}
                                name="skills"
                                isMulti
                                placeholder=""
                                options={skills}
                                className={errors.skills && touched.skills ? "capabilities_select_red" : "capabilities_select"}
                                classNamePrefix="capabilities_select"
                            />
                            <ErrorMessage className="text_error" name="skills" component="div"/>
                        </div>
                        <div className="area_wrapp">
                            <label htmlFor="info" className="label_capabilities_area">Additional information</label>
                            <Field 
                                style={{'resize': 'none'}}
                                maxLength="301"
                                name="info" 
                                as="textarea"
                                className={errors.info && touched.info ? "capabilities_area_red" : "capabilities_area"}
                            />
                            <ErrorMessage className="text_error" name="info" component="div"/>
                        </div>
                    </div>
                    <div className="capabilities_box">
                        <div className="capabilities_hobbies" id="checkbox-group">My hobbies</div>
                        <div className="capabilities_chekbox" role="group" aria-labelledby="checkbox-group">
                            <MyCheckbox 
                                value="Art" 
                                name="hobies">
                                Art
                            </MyCheckbox>
                            <MyCheckbox 
                                value="Sport, fitness, aerobica and staff like that" 
                                name="hobies">
                                Sport, fitness, aerobica and staff like that
                            </MyCheckbox>
                            <MyCheckbox 
                                value="I just want to play games, I'm not living in this life" 
                                name="hobies">
                                I just want to play games, I'm not living in<br/> this life
                            </MyCheckbox>
                            <MyCheckbox 
                                value="I'm a female... I'm doing nothing. Every day." 
                                name="hobies">
                                I'm a female... I'm doing nothing. Every day.
                            </MyCheckbox>
                            <MyCheckbox 
                                value="Guitar, guitar and guitar again. I'm fall in love with it." 
                                name="hobies">
                                Guitar, guitar and guitar again. I'm fall in<br/> love with it
                            </MyCheckbox>
                            <MyCheckbox 
                                value="WTF is “hobbies”???" 
                                name="hobies">
                                WTF is “hobbies”???
                            </MyCheckbox>
                        </div>
                    </div>
                    {single.length > 0 && location.pathname === '/Wizard-form/userEditing' ? <button type="submit" className='button_account'>Save</button> :
                        <>
                            <button onClick={() => dispatch(switchForm("contacts"))} className='button_capabilities_back' >Back</button>
                            <button type="submit" className='button_capabilities_finish' disabled={capabilitiesName}>Finish</button>
                        </>
                    }    
                    {capabilitiesName && single.length === 0 ? <div className="text_error_button">Fill out the previous form</div> : null}
                </Form>
            )}   
        </Formik>
    );
}

export default Capabilities;

