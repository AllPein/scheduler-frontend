import React from 'react'
import { Navbar, Collections, UserInfo } from '../../components/index';
import { useLazyQuery } from '@apollo/react-hooks';
import { Route, withRouter } from 'react-router-dom';
import './Home.scss';
import gql from 'graphql-tag';

const GET_USER = gql`
  query me {
    username
    email
  }
`

const Home = props => {
  if (!localStorage.getItem("token")) {
    props.history.push('/login');
  }

  return (
    <div className='home' >
      <div className="home-sidebar">
        <Navbar />
      </div>
      <div className="home-main">
        <Route path='/schedule' component={Collections} /> 
        
      </div>
      <div className="home-user">
        <UserInfo />
      </div>
    </div>
  )
}
 
export default withRouter(Home) ;
 