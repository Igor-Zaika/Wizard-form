import { useDispatch, useSelector } from 'react-redux';

import { switchForm } from '../topOfForm/formsSlice'
import { selectAll as  singleData } from '../user/SingleUserSlice'

import './topOfForm.scss'


const TopOfForm = () => {
    const { tabs } = useSelector(state => state.users);
    const single = useSelector(singleData);
    const dispatch = useDispatch();

    const getActiveForm = (name) => {
        if(single.length === 0) {
            dispatch(switchForm(name));
        }
    }

    const renderTopOfForms = () => {
        let container = [];
        const name = ["1.Account", "2.Profile", "3.Contacts", "4.Capabilities"]; 

        for(let i = 0; i < 4; i++) {
            container.push(
                <div
                    key={i}
                    className={tabs[i].active ? "rectangle_active" : "rectangle"} 
                    onClick={() => getActiveForm(name[i].slice(2).toLowerCase())}>
                    <div className={tabs[i].active ? "content_rectangle_active" : "content_rectangle"}>
                        {name[i]}
                    </div>
                </div>
            ) 
        }
        return container;
    }

    return(
        <div className="top_of_form" >
            {renderTopOfForms()}
        </div>
    )
}

export default TopOfForm;