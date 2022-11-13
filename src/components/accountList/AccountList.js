import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from 'react';

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
    const allUsers = useSelector(selectAll);
    const isLoading = useSelector(state => state.users.formsLoadingStatus);
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dialog, setDialog] = useState({
        pic: "",
        name: "",
        id: "",
    });
    const [singleUserId, setSingleUserId] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const pagesCount = Math.ceil(totalCount/7);
    const pages = [];

    useEffect(() => {
        dispatch(usersData(currentPage));
        console.log('effect page')
        // eslint-disable-next-line
    },[currentPage])

    useEffect(() => {
        console.log('effect total')
        getAllList().then(request => {
            return setTotalCount(request.length)
        })
    }, [totalCount])

    const showConfirmation = (pic, id, name) => {
        setDialog({
            pic,
            id,
            name
        });
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
        if(name.length > 14) {
            return name.charAt(0).toUpperCase() + name.slice(1, 14) + "..."
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
        setTotalCount(num)
        clearUsers();
        dispatch(clearAllListOfUsers());
        for(let i = 0; i < num; i++){
            const user = generateOneRandomUser();
            setList(user.id,user);
        }
        dispatch(usersData(currentPage));
        
    }

    const switchPage = (page) => {
        dispatch(clearAllListOfUsers());
        setCurrentPage(page);
        // dispatch(usersData(page));
    }

    createPaginationPages(pages, pagesCount, currentPage);
    
    const createPagination = () => {
        return <div className="pagination">
            {pages.map((page,index) => <span 
                key={index} 
                className={currentPage === page ? "pagination_current_page" : "pagination_page"}
                onClick={() => switchPage(page)}
                >{page}</span>)}
        </div>
    }

    const renderAccountList = (arr) => {  
        const items = arr.map(user => {
            let active = singleUserId === user.id
            let clazz = active ? "account_frame_shifted" : "account_frame"
            return (
                <CSSTransition key={user.id} timeout={500} classNames={clazz}>
                    <li className={clazz}>
                        <img className="account_pic" src={user.img ? user.img : avatar} alt="user"/>
                        <div className="names_box">
                            <div className="name_account">{cutLongName(user.firstname) + ' ' + cutLongName(user.lastname)}</div>
                            <div className="user_name_account">{cutLongName(user.name)}</div>
                        </div>
                        <div className="account_company">{cutLongName(user.company)}</div>
                        <div className="account_contacts">{user.phone1 ? user.phone1 : user.email}</div>
                        <div className="account_last_update">{calcLastUpdate(user.update)}</div>
                        {active ? null : <Link to={`/wizard-form/${user.id}`} ><img className="account_edit" src={edit} alt="edit" /></Link>}
                        {active ? 
                        <div ref={wrapperRef} className="extra_box" >
                            <img fill="red" className="account_close_red" src={close} alt="close"/>
                            <div className="delete_red" 
                                onClick={() => showConfirmation(user?.img,user.id,user.name)}
                                >delete</div>
                        </div> : 
                        <img className="account_close" src={close} alt="close" onClick={() => actionConfirmation(user.id)}/>}
                    </li>
                </CSSTransition> 
            )          
        })
        return(
            <>
                <TransitionGroup className="wrapp_account_list" component={'ul'}>
                    {items}
                </TransitionGroup>
            </>
            
        )
    } 

    const errorMessage = isLoading === "error" ? <ErrorMessage/> : null;
    const spiner = isLoading === "loading" ? <Spinner/> : null;

    return(
        <>  
            {errorMessage}
            {spiner}
            {allUsers.length === 0 && isLoading !== 'loading' && totalCount === 0 ? <NoUsers/> : renderAccountList(allUsers)}
            {dialog.name ? 
            <div className="dialog_wrapp" onClick={() => setDialog("")}>
            <div className="dilog_window">
                <p className="dilog_name">"Are you sure you want to delete?"</p>
                {dialog.pic ? <img className="dialog_pic" src={dialog.pic} alt="user"/> : <div className="dialog_name">{cutLongName(dialog.name)}</div>}
                <div className="dialog_buttons">
                    <button className="button_yes" onClick={() => onDeleteUser()}>Yes</button>
                    <button className="button_no" onClick={() => setDialog("")}>No</button>
                </div>
            </div>
            </div> : null}
            {isLoading !== 'loading' ? <button className="generate"onClick={() => startGenerateRandomListOfUsers(100)}>Generate accounts</button> : null}
            {isLoading === 'idle' ? createPagination() : null}
        </>
    );
}

export default AccountList;