import React from 'react';
import {Link,hashHistory} from 'react-router';

export default class Reg extends React.Component{
	constructor(){
		super();
		this.state={
			iptUserName:"",
			iptPassWord:""
		}
		this.reg=this.reg.bind(this)
		this.changeUserName=this.changeUserName.bind(this)
		this.changePassWord=this.changePassWord.bind(this)
		
	}
	reg(){
		var checkbox = document.querySelector("#checkbox");
		var userName = this.state.iptUserName
		var password = this.state.iptPassWord
		if(checkbox.checked){
			var searchParams = new URLSearchParams()
			searchParams.set('act','reg')
			searchParams.set('userID',userName)
			searchParams.set('password',password)
			fetch('http://localhost:8003/user', {
			  method: 'POST',
			  body: searchParams
			}).then(res => {return res.json()
			}).then(data=>{
				if(userName&&password){
					if(data==0){
						alert("网络错误")
					}else if(data==1){
						alert("用户名已存在")
					}else{
						alert("注册成功");
						window.location="http://localhost:8001/#/login"
					}
				}else{
					alert("用户名或密码不能为空")
				}
				// console.log(data)
			})
		}else{
			alert("请阅读用户协议")
		}
		
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
			<div className="reg">
				<div className="header">
					<a onClick={()=>{hashHistory.go(-1)}} className="cate"><img src="src/assets/images/return.jpg"/></a>
					<h2 className="text">注册</h2>
				</div>
				<div className="h50"></div>
				<div className="reg">
					<input type="text" placeholder="请输入帐号" className="reg-iphone"  onChange={this.changeUserName}/>
					<input type="text" placeholder="请输入密码" className="reg-password" onChange={this.changePassWord}  />
				</div>
				<div className="reg-text">
					<input type="checkbox" id="checkbox"/>
					同意<Link>《注册服务协议》</Link>以及<Link>《隐私政策》</Link>
				</div>
				<span className="reg-btn" onClick={this.reg}>注册</span>
			</div>
		)
    }
}