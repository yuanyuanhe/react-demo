import React from 'react';
import {Link,hashHistory} from 'react-router';
import {connect} from "react-redux";
import ToCart from "./tocart"
class Detail extends React.Component{
	constructor(){
		super();
		this.state={
			obj:{},
			userName:""
		}
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
		var searchParams = new URLSearchParams();
		searchParams.set('act',this.props.params.aid)
		fetch('http://localhost:8003/milkgoods', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			console.log(data)
			this.props.hideLoading();
			this.setState({
				obj:data[0]
			})
		})
	}
	toCart(){
		var userName = localStorage.getItem("userName")
		// console.log(pid)
		// console.log(userName)
		if(userName){
			this.props.showLoading();
			var searchParams = new URLSearchParams()
			searchParams.set("act","milkcart");
			searchParams.set("userID",userName);
			searchParams.set("pid",this.props.params.aid);
			fetch('http://localhost:8003/user', {
			  method: 'POST',
			  body: searchParams
			}).then(res => {
				return res.json()
			}).then(data=>{
				this.props.hideLoading();
				console.log(data)
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
			<div className="detail">
				<div className="header">
				<a onClick={(ev)=>{hashHistory.go(-1)}} className="cate"><img src="src/assets/images/return.jpg"/></a>
				<ul className="detail-btn">
					<li className="current"><a href="javascript:;">商品</a></li>
					<li><a href="javascript:;">详情</a></li>
					<li><a href="javascript:;">评价</a></li>
				</ul>	
				<ToCart/>
			</div>
			<div className="h50"></div>
			<div className="banner">
				<img src={this.state.obj.imgurl} />
			</div>
			<div className="detail">
				<div className="detail-left">
					<h2>{this.state.obj.goodname}</h2>
					<span><i>￥</i>{this.state.obj.nowprice}</span>
					<del>￥{this.state.obj.beforeprice}</del>
				</div>
				<div className="detail-right">
					<img src="src/assets/images/zan.jpg" />
					<p>值不值</p>
				</div>
			</div>
			<div className="detail-decript">
				<span>已出售：{this.state.obj.salenum}</span>
				<em>广东广州</em>
			</div>
			<a href="javascript:;" className="information">选择口味和数量</a>
			<div className="detail-content">
				<h2>商品详情</h2>
				<p>递一时间，已时间定义的高品质发酵酸奶，奶源来自直属生态牧场。每一滴都天然无添加，从牧场到餐桌的过程不超过24小时，递一时间将最新鲜的牛奶送到您好家人的身边，新鲜品质生活，从递一时间开始。</p>
				<img src="src/assets/images/image.jpg" />
			</div>
			<ul className="comment">
				<h2>评价</h2>
				<li>
					<div className="comment-top">
						<span>2016.05.18</span>
						<em>189****0751</em>
						<em>（小红）</em>
					</div>
					<div className="comment-bot">
						很好喝
					</div>
				</li>
				<li>
					<div className="comment-top">
						<span>2016.05.18</span>
						<em>189****0751</em>
						<em>（小红）</em>
					</div>
					<div className="comment-bot">
						很好喝
					</div>
				</li>
				<li>
					<div className="comment-top">
						<span>2016.05.18</span>
						<em>189****0751</em>
						<em>（小红）</em>
					</div>
					<div className="comment-bot">
						很好喝
					</div>
				</li>
				<li>
					<div className="comment-top">
						<span>2016.05.18</span>
						<em>189****0751</em>
						<em>（小红）</em>
					</div>
					<div className="comment-bot">
						很好喝
					</div>
				</li>
			</ul>
			<a href="javascript:;" className="detail-more">查看更多</a>
			<div className="h50"></div>
			<div className="detail-footer">
					<ul className="footer-left">
						<li>
							<a href="javascript:;">
								<img src="src/assets/images/message.jpg" />
								<p>在线</p>
							</a>
						</li>
						<li>
							<a href="javascript:;">
								<img src="src/assets/images/collect.jpg" />
								<p>收藏</p>
							</a>
						</li>
					</ul>
					<ul className="footer-right">
						<li>
							<a  onClick={(ev)=>{this.toCart(this.props.params.aid);this.props.add(this.state.userName?1:0)}}>加入购物车</a>
						</li>
						<li>
							<a href="javascript:;">立即购物</a>
						</li>
					</ul>
				</div>
			</div>
		)
    }
}


const mapStateToProps=(state,ownProps)=>{
	// console.log(state)
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
  )(Detail)