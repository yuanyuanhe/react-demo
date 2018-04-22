import React from 'react';
import {Link,hashHistory} from 'react-router';
import {connect} from "react-redux";
class Cart extends React.Component{
	constructor(){
		super();
		this.state={
			list:[],
			userName:"",
			arr:[],
			sum:0
		}
		this.add=this.add.bind(this);
		this.minus=this.minus.bind(this);
		this.checkAll=this.checkAll.bind(this);
		this.check=this.check.bind(this);
		this.getSum=this.getSum.bind(this);
		
	}
	componentWillMount(){
		var userName = localStorage.getItem("userName")
		// console.log(userName)
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
				// console.log(data)
				var searchParams = new URLSearchParams();
				searchParams.append("act","getmilkcart");
				searchParams.append("data",data[0].milkbuyitem);
				fetch('http://localhost:8003/milkgoods', {
				  method: 'POST',
				  body: searchParams
				}).then(res => {
					return res.json()
				}).then(data=>{
					// console.log(data);
					this.props.hideLoading();
					this.setState({
						list:data
					})
				})
			})
		}
	}
	add(pid){
		console.log(pid);
		console.log(this.state.userName);
		let list = this.state.list;
		list.map((val)=>{
			if(val.pid==pid){
				val.num++;
			}
		})
		this.setState({
			list:list
		})
		var searchParams = new URLSearchParams();
		searchParams.set("act","addmilk");
		searchParams.set("pid",pid);
		searchParams.set("userID",this.state.userName);
		fetch('http://localhost:8003/user', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			// console.log(res.json())
			return res.json()
		}).then(data=>{
			console.log(data)
		})
		this.getSum();
		
	}
	minus(pid){
		// console.log(pid);
		// console.log(this.state.userName);
		let list = this.state.list;
		list.map((val)=>{
			if(val.pid==pid){
				if(val.num<=1){
					val.num=1
				}else{
					val.num--;
				}
			}
		})
		this.setState({
			list:list
		})
		var searchParams = new URLSearchParams();
		searchParams.append("act","minusmilk");
		searchParams.append("pid",pid);
		searchParams.append("userID",this.state.userName);
		fetch('http://localhost:8003/user', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			console.log(data)
		})
		this.getSum();
		
	}
	del(pid){
		console.log(pid);
		console.log(this.state.userName);
		let list = this.state.list;
		list.map((val,key)=>{
			if(val.pid==pid){
				list.splice(key,1)
			}
		})
		this.setState({
			list:list
		})
		var searchParams = new URLSearchParams();
		searchParams.append("act","delmilk");
		searchParams.append("pid",pid);
		searchParams.append("userID",this.state.userName);
		fetch('http://localhost:8003/user', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			console.log(data)
		})
		this.getSum();
		
	}
	checkAll(){
		console.log(this);
		var checkAll = document.querySelector("#all")
		console.log(checkAll);
		var list = this.state.list;
		if(checkAll.checked){
			list.forEach(val=>{
				val["checked"]=true
			})
		}else{
			list.forEach(val=>{
				val["checked"]=false
			})
		}
		this.setState({
			list:list
		})
		console.log(list);
		this.getSum();
		
	}
	check(pid){
		console.log(pid)
		var bl = true;
		var checkAll = document.querySelector("#all")
		var list = this.state.list;
		list.forEach((val,key)=>{
			if(pid==val.pid){
				val.checked=!val.checked
				if(!val.checked){
					checkAll.checked=false
				}
			}
			if(!val.checked){
				bl = false 
			}
		})
		checkAll.checked=bl;
		this.setState({
			list:list
		})
		console.log(list);
		this.getSum();
	}
	getSum(){
		var list = this.state.list;
		var arr = [];
		list.forEach((val,key)=>{
			if(val.checked){
				arr.push(val);
			}else{
				arr.splice(key,1)
			}
		})
		// console.log(arr)
		var sum = 0;
		arr.forEach((val,key)=>{
			sum+=val.num*val.nowprice			
		})
		this.setState({
			sum:sum.toFixed(2)
		})
	}
	toFixed(num){
		// console.log(Number(num).toFixed(2))
		return Number(num).toFixed(2)
	}
    render(){
		// console.log(this.state.list)
		let list = this.state.list
        return (
			<div className="cart">
				<div className="header">
					<a onClick={(ev)=>{hashHistory.go(-1)}} className="cate"><img src="src/assets/images/return.jpg"/></a>
					<h2 className="text">我的购物车</h2>
				</div>
				<div className="h50"></div>
				<div className="shopcar-text">
					<div className="shopcar-text-left">商品</div>
					<div className="shopcar-text-right">单价</div>
				</div>
				<ul className="shop-list">
					{
						list.map((val,key)=>{
							return  <li key={val.pid}>
										<div className="shop-list-top">
											<div className="shop-btn">
												<input className="magic-checkbox" type="checkbox" name="layout" id="btn1" checked={val.checked} onClick={(ev)=>{this.check(val.pid)}}/>
											</div>
											<Link  to={{pathname:'/detail/'+val.pid,query:{pid:val.pid}}} className="shop-pic">
												<img src={val.imgurl} />
											</Link>
											<div className="shop-text">
												<h2>{val.goodname}</h2>
												<div className="shop-num">
													<span>数量：</span>
													<div className="shop-arithmetic">
														<a href="javascript:;" className="minus" onClick={(ev)=>{this.minus(val.pid)}}>-</a>
														<em>{val.num}</em>
														<a href="javacript:;" className="plus" onClick={(ev)=>{this.add(val.pid)}}>+</a>
													</div>
												</div>
											</div>
											<div className="shop-price">￥{this.toFixed(val.nowprice)}</div>
										</div>
										<div className="shop-list-bottom">
											<a href="javascript:;" className="del" onClick={(ev)=>{this.del(val.pid)}}><img src="src/assets/images/del.jpg"/></a>
											<a href="javascript:;" className="price">小结：<span>￥{this.toFixed(val.nowprice*val.num)}</span></a>
										</div>
									</li>
						})
					}
				</ul>
				<div className="h50"></div>
				<div className="shapcar-footer">
					<div className="shop-btn">
						<input className="magic-checkbox" type="checkbox" name="layout" id="all" onClick={this.checkAll}/>
						<span>全选</span>
					</div>
					<a className="btn">结算</a>
					<div className="allprice">总计：<span>￥{this.state.sum}</span></div>
				</div>
				<div className="h50"></div>
			</div>
		)
    }
}

const mapStateToProps=(state,ownProps)=>{
	return {
  
	}
  };
  
  //所有需要递交的action请求
  const mapDispatchToProps=(dispatch,ownProps)=>{
	return {
	  showLoading:()=>{
		dispatch({type:'SHOW_LOADING'});
	  },
	  hideLoading:()=>{
		dispatch({type:'HIDE_LOADING'});
	  }
	}
  };
  
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(Cart);