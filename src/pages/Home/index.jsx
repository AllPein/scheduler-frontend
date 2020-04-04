import React from 'react'
import { Navbar, Tasks, UserInfo } from '../../components/index';
import { Route } from 'react-router-dom';
import './Home.scss';


const Home = props => {

  

  return (
    <div className='home' >
      <div className="home-sidebar">
        <Navbar />
      </div>
      <div className="home-main">
        <Route path='/schedule' component={Tasks} /> 
        
      </div>
      <div className="home-user">
        <UserInfo />
      </div>
    </div>
  )
}
 
export default Home;
 