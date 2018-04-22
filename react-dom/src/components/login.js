import React from 'react';
import '../assets/css/login.css';
import {Link,hashHistory} from "react-router";
export default class Login extends React.Component{
	constructor(){
		super();
		this.state={
			iptUserName:"",
			iptPassWord:""
		}
		this.changeUserName=this.changeUserName.bind(this);
		this.changePassWord=this.changePassWord.bind(this);
		this.login=this.login.bind(this);
	}
	login(){
		var _this=this;
		var userName = this.state.iptUserName
		var password = this.state.iptPassWord
			var searchParams = new URLSearchParams()
			searchParams.set('act','login')
			searchParams.set('userID',userName)
			searchParams.set('password',password)
			fetch('http://localhost:8003/user', {
			  method: 'POST',
			  body: searchParams
			}).then(res => {return res.json()
			}).then(data=>{
				// console.log(data)
				if(userName&&password){
					if(data==1){
						alert("网络错误")
					}else if(data==0){
						alert("帐号或密码错误")
					}else{
						alert("登入成功")
						// window.location="/#/user"
						hashHistory.push('/user')
						localStorage.setItem("userName",userName);
						location.reload();
						console.log(localStorage.getItem("userName"));
					}
				}else{
					alert("用户名或密码不能为空")
				}
				// console.log(data)
			})
	}
	changeUserName(ev){
		var ev = ev||event;
		var target = ev.target||ev.srcElement;
		this.setState({
			iptUserName:target.value
		})
		// console.log(target.value)
	}
	changePassWord(ev){
		var ev = ev||event;
		var target = ev.target||ev.srcElement;
		this.setState({
			iptPassWord:target.value
		})
		// console.log(target.value)
	}
    render(){
        return (
			<div className="loginPage">
				<div className="login-logo"><img src="src/assets/images/logo.jpg"/></div>
				<div className="login">
					<input type="text" placeholder="用户名" className="login-name" onChange={this.changeUserName}/>
					<input type="text" placeholder="请输入密码" className="login-password" onChange={this.changePassWord}/>
					<a  className="login-btn" onClick={this.login}>登录</a>
				</div>
				<div className="login-text">
					<Link to="/reg" className="fl">免费注册</Link>
				</div>
			</div>
		)
    }
}