import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import MainPage from "./MainPage";
import Header from "../header/Header";
import User from "../user/User";
import Spinner from "../spinner/Spinner";


const UserViewPage = () => {
    const { singleUser } = useSelector(state => state);
    let navigate = useNavigate();

    return(
        <div className="page">
            <User/>
        </div>
    );
}

export default UserViewPage;