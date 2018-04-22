import React from 'react';
import {Router,Route,hashHistory,Link,browserHistory,IndexRoute,Redirect} from 'react-router';

import Home from './components/Home';
import Category from './components/category';
import Cart from './components/cart';
import Login from './components/login';
import Reg from './components/reg';
import User from './components/user';
import Detail from './components/detail';
import App from './components/App';


const RouterConfig = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home}/>
      <Route path="category" component={Category}/>
      <Route path="cart" component={Cart}/>
      <Route path="login" component={Login}/>
      <Route path="reg" component={Reg}/>
      <Route path="user" component={User}/>
      <Route path="detail/:aid" component={Detail}/>

    </Route>
  </Router>
);
export default RouterConfig;