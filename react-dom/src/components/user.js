import React from 'react';
import {Link,hashHistory} from 'react-router';
import "../assets/css/user.css"
export default class User extends React.Component{
	constructor(){
		super();
		this.state={
			userName:""
		}
	}
	logout(){
		localStorage.removeItem("userName");
		console.log(localStorage.getItem("userName"))
		window.location="/#/login";
		location.reload();
	}
	componentDidMount(){
		this.setState({
			userName:localStorage.getItem("userName")
		})
	}
    render(){
        return (
			<div className="user">
				<h3>欢迎<span>{this.state.userName}</span>！</h3>
				<span className="reg-btn" onClick={this.logout}>注销</span>
			</div>
		)
    }
}