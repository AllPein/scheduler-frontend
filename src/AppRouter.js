import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import { Home, Auth } from './pages/index';


const AppRouter = ({client}) => {
  return (
      <Switch>
        <Route
            path={["/login", "/register"]}
            component={Auth}
        />
        <Route
            path="/"  
            component={Home}
        />
      </Switch>
          
        
  )
}
 
export default AppRouter;
 