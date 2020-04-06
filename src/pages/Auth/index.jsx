import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import { Login, Register } from '../../Modules/index'; 
import './Auth.scss';

const Auth = props => {
  if (!!localStorage.getItem("token")) {
    props.history.push('/schedule');
}
  

  return (
    <div className='auth-wrapper'>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
    </div>
    
  )
}
 
export default withRouter(Auth);
 