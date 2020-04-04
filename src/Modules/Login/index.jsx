import React from 'react';
import { Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Login = props => {
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
                            >
                            ВОЙТИ
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
 
export default Login;
 