import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, redirect} from "react-router-dom";
import Main from "@/interface/pages/main";
import Error from "@/interface/pages/error";
import Login from "@/interface/pages/login";
import {useActionCreators, useAppSelector} from "@/libs/hooks";
import {userActions} from "@/store/user";
import Spinner from "@/interface/ui/spinner";
import {authRoutes, publicRoutes} from "@/routes";


const Router = () => {
    const {loginIn} = useActionCreators(userActions)
    const {data} = useAppSelector(state => state.userReducer)
    const user = window.localStorage.getItem('user')
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (Boolean(user)) {
            loginIn(user)
        }
        setLoading(false)
    }, [])
    
    if (loading)
        return <Spinner/>
    
    return (
        <Routes>
            {!loading && [
                <Route path={'/'} element={<Main/>}/>,
                <Route path={'/login'} element={<Login/>}/>,
                <Route path={'/error'} element={<Error/>}/>,
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>,
            ]}
        </Routes>
    );
};

export default Router;