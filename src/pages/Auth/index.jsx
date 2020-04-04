import React from 'react'
import { Route } from 'react-router-dom';
import { Login, Register } from '../../Modules/index'; 
import './Auth.scss';

const Auth = props => {
  return (
    <div className='auth-wrapper'>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
    </div>
    
  )
}
 
export default Auth;
 