import React, { useState, useEffect } from 'react';
import { showNotification } from '../../utils/index';
import { Form, Icon, Input, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom";
import { useLazyQuery} from '@apollo/react-hooks';
import { GET_TOKEN } from '../../utils/graphql';




const Login = props => {
    const [signIn, {data, loading, error, client}] = useLazyQuery(GET_TOKEN, {
         onCompleted() {
            localStorage.setItem("token", data.getToken.token);
            client.writeData({
                data: {
                    user: data.getToken.user,  
                    loggedIn: true
                }
            })
            props.history.push("/schedule");
        }
    });
    
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const login =  () => {
        signIn({ variables: { email, password } });
    }

    useEffect(() => {
        if (error){
            showNotification({
                text: error.toString(),
                type: "error",
                title: "Ошибка",
            })
        }
        
    }, [error]);

  return (
    <div className='auth'>
        <div className="auth-container">
            <div className='auth-container__left'></div>
            <div className='auth-container__right'>
                <div className="auth-container__right-title">
                    <h1>Добро </h1>
                    <h1>пожаловать</h1>
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
                            onClick={login}
                            >
                            {!loading ? (<span>ВОЙТИ</span>) : (
                                <LoadingOutlined style={{ fontSize: 24 }} spin />
                            )}
                            </Button>
                        </Form.Item>
                        <div>
                            Нужен аккаунт? <Link className="auth__register-link" to="/register">
                                Создайте
                            </Link> бесплатно
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        
    </div>
  )
}
 
export default withRouter(Login);
 