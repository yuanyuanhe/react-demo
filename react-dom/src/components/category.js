import React from 'react';
import {Link,hashHistory} from 'react-router';
import {connect} from "react-redux";
import ToCart from './tocart';
class Category extends React.Component{
	constructor(){
		super();
		this.state={
			list:[],
			userName:""
		},
		this.getData=this.getData.bind(this)
		this.toCart=this.toCart.bind(this)
	}
	componentWillMount(){
		this.getData();
		this.getNum();
		this.setState({
			userName:localStorage.getItem("userName")
		})
	}
	getData(){
		this.props.showLoading();
		var searchParams = new URLSearchParams()
		fetch('http://localhost:8003/milkgoods', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			console.log(data)
			this.props.hideLoading();
			this.setState({
				list:data
			})
		})
	}
	toCart(pid){
		var userName = localStorage.getItem("userName")
		// console.log(pid)
		// console.log(userName)
		if(userName){
			this.props.showLoading();
			var searchParams = new URLSearchParams()
			searchParams.set("act","milkcart");
			searchParams.set("userID",userName);
			searchParams.set("pid",pid);
			fetch('http://localhost:8003/user', {
			  method: 'POST',
			  body: searchParams
			}).then(res => {
				console.log(res)
				return res.json()
			}).then(data=>{
				console.log(data)
				this.props.hideLoading();
			})
		}else{
			alert("请登入")
		}
	}
	getNum(){
		var userName = localStorage.getItem("userName")
		if(userName){
			this.props.showLoading();
			this.state.userName=userName;
			var searchParams = new URLSearchParams();
			searchParams.append("act","getmilkcart");
			searchParams.append("userID",userName);
			fetch('http://localhost:8003/user', {
			  method: 'POST',
			  body: searchParams
			}).then(res => {
				return res.json()
			}).then(data=>{
				console.log(data)
				var obj = JSON.parse(data[0].milkbuyitem);
				var num = 0;
				for(var key in obj){
					num+=obj[key]
				}
				console.log(num)
				this.props.changeNum(num);
			})
		}
	}
    render(){
        return (
			<div className="category">
				<div className="header">
	        <a href="javascript:;" className="cate"><img src="src/assets/images/cate.jpg"/></a>
	        <a href="" className="zoom"><img src="src/assets/images/zoom.jpg"/></a>
	        <h2 className="text">递一时间</h2>
			<ToCart/>
		</div>
		<ul className="category-menu">
			<h2>分类</h2>
			<li className="current"><a href="">递一时间礼盒装</a></li>
			<li><a href="">递一时间</a></li>
			<li><a href="">凡希蒂</a></li>
			<li><a href="">畅想牛奶</a></li>
			<li><a href="">巴士鲜奶</a></li>
			<li><a href="">袋装酸奶</a></li>
			<li><a href="">老酸奶</a></li>
			<li><a href="">益膳房纯牛奶</a></li>
			<li><a href="">益畅</a></li>
			<li><a href="">酸益乳</a></li>
		</ul>
		<div className="h50"></div>
	
        <ul className="salse">
			{
				this.state.list.map((val,key)=>{
					return  <li key={val.pid} id="item">
								<Link to={{pathname:'/detail/'+val.pid,query:{pid:val.pid}}}>
									<img src={val.imgurl} />
									<h2>{val.goodname}</h2>
									<div className="infor">
										<em>月销量：{val.salenum}</em>
										<span><i>￥</i>{val.nowprice}</span>
									</div>
								</Link>
								<button id="btn" onClick={(ev)=>{this.toCart(val.pid);this.props.add(this.state.userName?1:0)}}>加入购物车</button>
							</li>
				})
			}
        </ul>
       
        <a className="gotop">回到顶部</a>
        <div className="h50"></div>
			</div>
		)
    }
}

const mapStateToProps=(state,ownProps)=>{
	console.log(state)
	return {  
	}
  }

const mapDispatchToProps=(dispatch,ownProps)=>{
	console.log(dispatch)
	return {
	  showLoading:()=>{
		dispatch({type:'SHOW_LOADING'});
	  },
	  hideLoading:()=>{
		console.log("bulala")
		dispatch({type:'HIDE_LOADING'});
	  },
	  add:(num)=>{
		dispatch({type:'ADD',payload:num});
	  },
	  changeNum:(num)=>{
		dispatch({type:'CHANGE_NUM',payload:num});
	  }
	}
  }
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(Category)