
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from 'react';

import { selectAll as  singleData, removeSingleUser } from '../user/SingleUserSlice'
import { setList, getAllList, clearUsers } from '../indexedDB'
import {  generateOneRandomUser, createPaginationPages } from '../../func';
import { selectAll, removeUser, usersData, clearAllListOfUsers } from '../topOfForm/formsSlice'
import NoUsers from '../noUsers/NoUsers';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './accountList.scss';
import edit from '../../icons/edit.png';
import close from '../../icons/close.png';
import avatar from '../../icons/avatar.svg';

const AccountList = () => {
    const dispatch = useDispatch();
    const single = useSelector(singleData);
    const allUsers = useSelector(selectAll);
    const isLoading = useSelector(state => state.users.formsLoadingStatus);
    const wrapperRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dialog, setDialog] = useState({
        pic: "",
        name: "",
        id: "",
    });
    const [singleUserId, setSingleUserId] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const pagesCount = Math.ceil(totalCount / 6);
    const pages = [];
    const [term, setTerm] = useState('');
    const [filteredPaginationUsers, setFilteredPaginationUsers] = useState(null);

    createPaginationPages(pages, pagesCount, currentPage);
    
    useEffect(() => {
        dispatch(usersData());
        if(single[0]){
            dispatch(removeSingleUser(single[0]));
        }
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        getAllList().then(request => {
            setTotalCount(request.length)
        })
    },[])

    useEffect(() => {
        serchUser(allUsers,term);
        // eslint-disable-next-line
    }, [term])

    const showConfirmation = (pic, id, name) => {
        setDialog({
            pic,
            id,
            name
        });
    }

    const changeTerm = (e) => {
        setTerm(e.target.value);
    }

    function serchUser(users, term ) {
        if(!term){
            setFilteredPaginationUsers(null);
            setTotalCount(allUsers.length);
        }
        if(term.length > 0){
            let filterUsers =  users.filter(user => {
                return user.firstname.indexOf(term) > -1 || user.lastname.indexOf(term) > -1
            })
            setFilteredPaginationUsers(filterUsers);
            setTotalCount(filterUsers.length);
        } 
    }
    
    const actionConfirmation = (id) => {
        setSingleUserId(id)
	}

    const useOutsideClose = (ref) => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setSingleUserId(null);  
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }
    useOutsideClose(wrapperRef);

    const onDeleteUser = () => {
        dispatch(removeUser(dialog.id));
        setTotalCount(totalCount - 1);
        setDialog({
            pic: "",
            id: "",
            name: ""
        });
	}

    const cutLongName = (name) => {
        if(name.length > 10) {
            return name.charAt(0).toUpperCase() + name.slice(1, 10) + "..."
        } else {
            return name.charAt(0).toUpperCase() + name.slice(1)
        }
    }

    const calcLastUpdate = (time) => {
        const spendTime = Math.floor(Date.now() - time);
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        if (spendTime < msPerMinute) {
            return Math.round(spendTime/1000) + ' seconds ago';   
        } else if (spendTime < msPerHour) {
            return Math.round(spendTime/msPerMinute) + ' minutes ago';   
        } else if (spendTime < msPerDay ) {
            return Math.round(spendTime/msPerHour ) + ' hours ago';   
        } else if (spendTime < msPerMonth) {
            return Math.round(spendTime/msPerDay) + ' days ago';   
        } else if (spendTime < msPerYear) {
            return Math.round(spendTime/msPerMonth) + ' months ago';   
        } else {
            return Math.round(spendTime/msPerYear ) + ' years ago';   
        }
    }

    const startGenerateRandomListOfUsers = (num) => {
        clearUsers();
        dispatch(clearAllListOfUsers());
        for(let i = 0; i < num; i++){
            const user = generateOneRandomUser();
            setList(user.id,user);
        }
        dispatch(usersData());
        setTotalCount(num);   
    }
    
    function renderPagination() {       
        return <div className="pagination">
            {pages.map((page,index) => <span 
                key={index} 
                className={currentPage === page ? "pagination_current_page" : "pagination_page"}
                onClick={() => setCurrentPage(page)}
                >{page}</span>)}
        </div>
    }

    const countPaginationUsers = (countPage, arr) => {
        const end = countPage * 6;
        const start = (end/countPage) * (countPage - 1);
        if(arr.length < 6){
            return arr;
        } else if(arr.length - end > 0){
            return arr.slice(start, end);
        } else if(arr.length - end <= 0){                  
            return arr.slice(start,arr.length);
        }
    }

    const renderAccountList = (arr) => {  
        const items = arr.map(user => {
            let active = singleUserId === user.id
            let clazz = active ? "account_frame_shifted" : "account_frame"
            return (                 
                <li className={clazz} key={user.id}>
                    <img className="account_pic" src={user.img ? user.img : avatar} alt="user"/>
                    <div className="names_box">
                        <div className="name_account">{cutLongName(user.firstname) + ' ' + cutLongName(user.lastname)}</div>
                        <div className="user_name_account">{cutLongName(user.name)}</div>
                    </div>
                    <div className="account_company">{cutLongName(user.company)}</div>
                    <div className="account_contacts">{user.phone1 ? user.phone1 : user.email}</div>
                    <div className="account_last_update">{calcLastUpdate(user.update)}</div>
                    {active ? null : 
                        <Link to={`/wizard-form/${user.id}`} ><img className="account_edit" src={edit} alt="edit" /></Link>}
                    {active ? 
                    <div ref={wrapperRef} className="extra_box" >
                        <img fill="red" className="account_close_red" src={close} alt="close"/>
                        <div className="delete_red" 
                            onClick={() => showConfirmation(user?.img,user.id,user.name)}
                            >delete</div>
                    </div> : 
                    <img className="account_close" src={close} alt="close" onClick={() => actionConfirmation(user.id)}/>}
                </li>
            )          
        })
        return(
            <div className="wrapp_account_list">
                    {items}
            </div>
            
        )
    } 

    const errorMessage = isLoading === "error" ? <ErrorMessage/> : null;
    const spiner = isLoading === "loading" ? <Spinner/> : null;
    const usersForPaginationRender = term &&  filteredPaginationUsers ? filteredPaginationUsers : allUsers;
    
    return(
        <>  
            {errorMessage}
            {spiner}
            {allUsers.length === 0 && isLoading !== 'loading' ? <NoUsers/> : renderAccountList(countPaginationUsers(currentPage,usersForPaginationRender))}
            {dialog.name ? 
            <div className="dialog_wrapp" onClick={() => setDialog("")}>
            <div className="dilog_window">
                <p className="dilog_name">"Are you sure you want to delete?"</p>
                {dialog.pic ? 
                    <img className="dialog_pic" src={dialog.pic} alt="user"/> : 
                    <div className="dialog_name">{cutLongName(dialog.name)}</div>}
                <div className="dialog_buttons">
                    <button className="button_yes" onClick={() => onDeleteUser()}>Yes</button>
                    <button className="button_no" onClick={() => setDialog("")}>No</button>
                </div>
            </div>
            </div> : null}
            {isLoading !== 'loading' && allUsers.length > 0
                ? 
                    <div className="bottom_wrapp">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="serch first/last name"
                            onChange={(e) => changeTerm(e)} 
                            value={term}/>
                        {renderPagination()}
                        <button 
                            className="generate"
                            onClick={() => startGenerateRandomListOfUsers(50)}
                            >Generate accounts
                        </button>  
                    </div>            
                : 
                <button className="generate_single" onClick={() => startGenerateRandomListOfUsers(50)}>Generate accounts</button>
            }
        </>
    );
}

export default AccountList;