import React from 'react';
import {userActions} from "@/store/user";
import IconLoginOut from "@/assets/icons/icon-logout.svg";
import {useActionCreators, useAppDispatch} from "@/libs/hooks";


const Header = () => {
    const { loginOut} = useActionCreators(userActions)
    
    const handleLogout = () => {
        loginOut()
        window.localStorage.removeItem('user')
    }
    
    return (
        <section className={'flex flex-row justify-between items-center px-8'} style={{height: '92px'}}>
            <div className={'header2'}>Simple Hotel Check</div>
            <div
                onClick={handleLogout}
                className={'flex flex-row justify-center items-center gap-4 cursor-pointer'
                }>
                <div className={'body1'}>Выйти</div>
                <IconLoginOut/>
            </div>
        </section>
    );
};

export default Header;