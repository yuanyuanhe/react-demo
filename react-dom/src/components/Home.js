import React from 'react';
import fetchJsonp from 'fetch-jsonp'
import {Link} from "react-router"
import ReactSwipe from 'react-swipe';
import {connect} from 'react-redux';
import ToCart from './tocart'
import Slider from './swiper'
class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			iptSearch:'',
			list:[],
			h:0,
			m:0,
			s:0,
			timer:null,
			timeList:[],
			hotList:[],
			newList:[],
			firstList:[],
			userName:""
		}
		this.get=this.get.bind(this);
		this.iptChange=this.iptChange.bind(this)
		this.iptBlur=this.iptBlur.bind(this)
		this.limitDate=this.limitDate.bind(this)
		this.getTimeData=this.getTimeData.bind(this)
		this.getHotData=this.getHotData.bind(this)
		this.getNewData=this.getNewData.bind(this)
		this.getFirstData=this.getFirstData.bind(this)
		this.toCart=this.toCart.bind(this)
		this.getNum=this.getNum.bind(this)
		
		
	}
	get(val){
		let url='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+val;
		fetchJsonp(url,{
			jsonpCallback:'cb'
		}).then(
			res => {
				console.log(res.json())
				return res.json()
			}
		).then(
			data => {
				console.log(data.s)
				this.setState({list:data.s})
			}
		)
	}
	iptChange(ev){
		var ev = ev||event
		var target = ev.target||ev.srcElement
		console.log(target.value)
		this.get(target.value)
	}
	iptBlur(){
		this.setState({list:[]})
	}
	limitDate(){
		var d1 = new Date();
		var d2 = new Date("2018-03-05");
		// console.log(d2)
		var d = d2.getTime()-d1.getTime()
		this.setState({
			h:this.fillZero(Math.floor(d/1000/60/60)),
			m:this.fillZero(Math.floor(d/1000/60%60)),
			s:this.fillZero(Math.floor(d/1000%60))
		})
		// console.log(this.state.h)
		// console.log(this.state.m)
	}
	fillZero(num){
		var str = '';
		var str1 = str+num
		return str1=str1.length<2?"0"+str1:str1
	}
	componentWillMount(){
		var carousel = document.querySelector(".carousel");
		var _this=this
		this.timer = setInterval(function(){
			_this.limitDate()
		},1000)
		// var userName = localStorage.getItem("userName");
		this.setState({
			userName:localStorage.getItem("userName")
		})
		this.getTimeData();
		this.getHotData();
		this.getNewData();
		this.getFirstData();
		this.getNum();
	}
	componentWillUnmount(){
		// console.log(this.timer)
		clearInterval(this.timer);
		
	}
	getTimeData(){
		this.props.showLoading();
		var searchParams = new URLSearchParams()
		searchParams.set('act','time')
		fetch('http://localhost:8003/milkgoods', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			// console.log(data)
			this.props.hideLoading();
			this.setState({
				timeList:data
			})
		})
	}
	getHotData(){
		var searchParams = new URLSearchParams()
		searchParams.set('act','hot')
		fetch('http://localhost:8003/milkgoods', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			// console.log(data)
			this.setState({
				hotList:data
			})
		})
	}
	getNewData(){
		var searchParams = new URLSearchParams()
		searchParams.set('act','new')
		fetch('http://localhost:8003/milkgoods', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			// console.log(data)
			this.setState({
				newList:data
			})
		})
	}
	getFirstData(){
		var searchParams = new URLSearchParams()
		searchParams.set('act','first')
		fetch('http://localhost:8003/milkgoods', {
		  method: 'POST',
		  body: searchParams
		}).then(res => {
			return res.json()
		}).then(data=>{
			// console.log(data)
			this.setState({
				firstList:data
			})
		})
	}
	toCart(pid){
		console.log(this.state.userName)
		var userName = localStorage.getItem("userName")
		// console.log(pid)
		// console.log(userName)
		if(userName){
			this.props.showLoading();
			var searchParams = new URLSearchParams()
			searchParams.append("act","milkcart");
			searchParams.append("userID",userName);
			searchParams.append("pid",pid);
			fetch('http://localhost:8003/user', {
			  method: 'POST',
			  body: searchParams
			}).then(res => {
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
				// console.log(data)
				var obj = JSON.parse(data[0].milkbuyitem);
				var num = 0;
				for(var key in obj){
					num+=obj[key]
				}
				// console.log(num)
				this.props.changeNum(num);
			})
		}
	}
    render(){
        return <div className="home">
            <div className="header">
			<a href="index.html" className="logo"><img src='src/assets/images/logo.jpg'/></a>
			<div className="search">
				<input  type="text" placeholder="请输入您需要的商品" onChange={this.iptChange} onBlur={this.iptBlur}/>
				<a href="javascript:;"><img src="src/assets/images/search.jpg"  alt=""/></a>
				<ul className="searchList">
					{
						this.state.list.map((val,index)=>{
							return (
								<li key={index}>{val}</li>
							);
						})
					}
				</ul>
			</div>
			<ToCart/>
		</div>
		<div className="h50"></div>
			<Slider/>
			{/* <a href="##"><img src="src/assets/images/banner.jpg"/></a> */}
		<ul className="nav">
			<li>
				<a href="##">
					<img src="src/assets/images/icon.jpg" />
					<p>每日签到</p>
				</a>
			</li>
			<li>
				<a href="##">
					<img src="src/assets/images/icon1.jpg" />
					<p>八折专区</p>
				</a>
			</li>
			<li>
				<a href="##">
					<img src="src/assets/images/icon2.jpg" />
					<p>积分红包</p>
				</a>
			</li>
			<li>
				<Link to="/category">
					<img src="src/assets/images/icon3.jpg" />
					<p>分类</p>
				</Link>
			</li>
		</ul>
		<div className="title">
			<span className="text" onClick={this.getTimeDate}>限时抢购</span>
			<div className="time">抢购倒计时：<span>{this.state.h}</span><b>：</b><span>{this.state.m}</span><b>：</b><span>{this.state.s}</span></div>
		</div>
		<ul className="scroll">
			{
				this.state.timeList.map((val,key)=>{
					return <li key={key}>
								<Link to={{pathname:'/detail/'+val.pid,query:{pid:val.pid}}}>
									<img src={val.imgurl} />
									<h2>{val.goodname}</h2>
									<div className="infor">
										<span><i>￥</i>{val.nowprice}</span>
										<button>立即抢购</button>
									</div>
								</Link>
						   </li>
				})
			}
		</ul>
		<div className="title">
			<span className="text">热门商品</span>
		</div>
        <ul className="salse">
        	{
				this.state.hotList.map((val,key)=>{
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
        <div className="title">
			<span className="text">新品商品</span>
		</div>
        <ul className="salse">
			{
				this.state.newList.map((val,key)=>{
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
        <div className="title">
			<span className="text"><i>F1</i>递一时间</span>
		</div>
        <ul className="salse">
			{
				this.state.firstList.map((val,key)=>{
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
        <a  className="gotop">回到顶部</a>
        <div className="h50"></div>
        </div>
    }
}

const mapStateToProps=(state,ownProps)=>{
	// console.log(state)
	return {  
	  bLoading:state.bLoading
	}
  }

const mapDispatchToProps=(dispatch,ownProps)=>{
	// console.log(dispatch)
	return {
	  showLoading:()=>{
		dispatch({type:'SHOW_LOADING'});
	  },
	  hideLoading:()=>{
		console.log("bulala")
		dispatch({type:'HIDE_LOADING'});
	  },
	  changeNum:(num)=>{
		dispatch({type:'CHANGE_NUM',payload:num});
	  },
	  add:(num)=>{
		dispatch({type:'ADD',payload:num});
	  }
	}
  }
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(Home)