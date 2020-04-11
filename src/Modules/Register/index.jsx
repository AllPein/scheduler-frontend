import React, { useState,useEffect } from 'react';
import { showNotification } from '../../utils/index';
import { Form, Icon, Input, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom";
import {CREATE_USER} from '../../utils/graphql';
import { useMutation } from '@apollo/react-hooks';


const Register = props => {
    const [signUp, {data, loading, error}] = useMutation(CREATE_USER, {
        update(cache, { data: { createUser: { user, token } } }) {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    user: user
                }
            })
            props.history.push('/schedule');
        }
    });
    const [email, setEmail] = useState(''); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error){
            showNotification({
                text: error.toString(),
                type: "error",
                title: "Ошибка",
            })
        }
        
    }, [error]);

    const register =  () => {
        signUp({ variables: { email, username, password } })  
    }
  return (
    <div className='auth'>
        <div className="auth-container">
            <div className='auth-container__left'></div>
            <div className='auth-container__right'>
                <div className="auth-container__right-title">
                    <h1>Пожалуйста, </h1>
                    <h1>создайте аккаунт</h1>
                </div>
                <div className="auth-container__right-elements">
                    <Form className="auth-form">
                        <Form.Item
                            hasFeedback
                        >
                            <Input
                            id="email"
                            onChange={({target: { value}}) => setEmail(value)}
                            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                            size="large"
                            placeholder="E-Mail"
                        
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                        >
                            <Input
                            id="username"
                            onChange={({target: { value}}) => setUsername(value)}
                            prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
                            size="large"
                            placeholder="Имя пользователя"
                        
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                        >
                            <Input
                            id="password"
                            onChange={({target: { value}}) => setPassword(value)}
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            size="large"
                            type="password"
                            placeholder="Пароль"
                        
                            />
                        </Form.Item>
                        
                        <Form.Item>
                        <Button
                            className='button'
                            size="large"
                            onClick={register}
                            >
                            {!loading ? (<span>СОЗДАТЬ</span>) : (
                                <LoadingOutlined style={{ fontSize: 24 }} spin />
                            )}
                            </Button>
                        </Form.Item>
                        <div>
                            Уже есть аккаунт? <Link className="auth__auth-link" to="/login">
                                Войти
                            </Link> 
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        
    </div>
  )
}
 
export default withRouter(Register);
 