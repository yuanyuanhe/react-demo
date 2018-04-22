import React, { Component } from 'react';
import '../assets/css/style.css';
import Navbar from './navbar'
// import Category from './category'
import Home from './home'
import User from './user'
// import Cart from './cart'
// import Detail from './detail'
// import Reg from './reg'
// import Login from './login'
import {Link} from 'react-router';
import Loading from './Loading';
import {connect} from 'react-redux';
class App extends Component {
  test(){
    console.log("bulala")
  }
  render() {
    let {bLoading,bNav,showLoading,hideLoading,showNav,hideNav} = this.props;
    let path=this.props.location.pathname;
    // console.log(path)
    if(/home|cart|category|login|user/.test(path)){
      setTimeout(showNav,0);
    }
    if(/detail|reg/.test(path)){
      setTimeout(hideNav,0);
    }
    return (
      <div className="App">
        {/* <Home/> */}
        {/* <Category/> */}
        {/* <Cart></Cart> */}
        {/* <Detail></Detail> */}
        {/* <Reg></Reg> */}
        {/* <Login></Login> */}
        {/* <User></User> */}
        {bLoading?<Loading/>:undefined}
        {this.props.children}
        {bNav?<Navbar/>:undefined}
      </div>
    );
  }
}
// export default App;


const mapStateToProps=(state,ownProps)=>{
  // console.log(state)
  return {  
    bLoading:state.bLoading,
    bNav:state.bNav
  }
}

const mapDispatchToProps=(dispatch,ownProps)=>{
  // console.log(dispatch)
  return {
    showLoading:()=>{
      dispatch({type:'SHOW_LOADING'});
    },
    hideLoading:()=>{
      dispatch({type:'HIDE_LOADING'});
    },
    showNav:()=>{
      dispatch({type:'SHOW_NAV'});
    },
    hideNav:()=>{
      dispatch({type:'HIDE_NAV'});
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

