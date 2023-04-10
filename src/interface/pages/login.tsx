import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import Paper from "@/interface/ui/paper";
import bgImg from '@/assets/images/BG.png'
import {validMail, validPassword} from "@/libs/configs";
import {useActionCreators, useAppDispatch, useAppSelector} from "@/libs/hooks";
import {selectIsAuth, userActions,} from "@/store/user";
import {Navigate} from "react-router-dom";


const Login = () => {
    const {loginIn} = useActionCreators(userActions)
    const isAuth = useAppSelector(selectIsAuth)
    const [form] = Form.useForm();
    const [login, setLogin] = useState({data: process.env.USER_EMAIL || '', error: false})
    const [password, setPassword] = useState({data: process.env.USER_PASSWORD || '', error: false})
    
    if (isAuth) return <Navigate to={"/"}/>
    
    const handleSubmit = () => {
        if (!login.data.match(validMail)) {
            setLogin({...login, error: true})
        }
        if (!password.data.match(validPassword)) {
            setPassword({...password, error: true})
        }
        if (login.data.match(validMail) && password.data.match(validPassword)) {
            window.localStorage.setItem('user', login.data)
            loginIn(login.data)
        }
    }
    
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, data: e.target.value})
    }
    
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({...password, data: e.target.value})
    }
    
    return (
        <div
            className={'bg-cover bg-center'}
            style={{backgroundImage: `url(${bgImg})`}}
        >
            <div
                className={'flex flex-col items-center justify-center backdrop-blur w-full h-screen'}
                style={{backgroundColor: ' #FFF5'}}
            >
                <Paper className={'p-8'}>
                    <h4 className={'header2 text-center mb-8'}>Simple Hotel Check</h4>
                    
                    <Form
                        layout="vertical"
                        form={form}
                        style={{width: '345px'}}
                        className={'flex flex-col items-stretch justify-center'}
                    >
                        
                        <Form.Item
                            required
                            className={'input-with-label'}
                        >
                            <label className={'font-light'}>Логин</label>
                            <Input
                                status={login.error ? "error" : ''}
                                type={'email'}
                                value={login.data}
                                onChange={handleChangeLogin}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            required
                            className={'input-with-label'}
                        >
                            <label className={'font-light'}>Пароль</label>
                            <Input
                                status={password.error ? "error" : ''}
                                type={'password'}
                                value={password.data}
                                onChange={handleChangePassword}
                            />
                        </Form.Item>
                        
                        
                        <Form.Item className={' mt-4 mb-0'}>
                            <Button
                                className={'btn-main'}
                                htmlType="submit"
                                onClick={handleSubmit}
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Paper>
            </div>
        </div>
    );
};

export default Login;