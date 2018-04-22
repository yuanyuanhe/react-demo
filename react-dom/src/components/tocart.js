import React from 'react';
import {Link,hashHistory} from 'react-router';
import {connect} from "react-redux";

class ToCart extends React.Component {
    render(){
        return (
            <Link to="/cart" className="car">
                <img src="src/assets/images/car.jpg"/>
                <div className="goodnum">{this.props.num}</div>
            </Link>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
	// console.log(state)
	return {  
	  num:state.num
	}
  }

const mapDispatchToProps=(dispatch,ownProps)=>{
	return {
	  
	}
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToCart)
