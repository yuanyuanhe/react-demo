import React from "react";
import {Link} from 'react-router';
import { setTimeout } from "timers";
export default class Navbar extends React.Component {
	constructor(){
		super();
		this.state={
			arr:[
				"1",
				"2",
				"3",
				"4"
			],
			userName:""
		}
		this.changeUrl=this.changeUrl.bind(this)
	}
	changeUrl(num){
		// console.log(num-1)
		var arr = this.state.arr;
		var arr1  = [];
		arr.forEach((val,key)=>{
			if(key==(num-1)){
				arr[key]=num+num+""
			}else{
				arr[key]=key+1
			}
		})
		this.setState({
			arr:arr
		})
	}
	componentWillMount(){
		this.state.userName = localStorage.getItem("userName");
		
	}
	componentDidMount(){
		setTimeout(()=>{
			var  arr = this.state.arr;
			var aA = $('.footer li a');
			console.log(aA)
			aA.each((key,val)=>{
				console.log(val.className)
				if(val.className){
					arr[key]=""+(key+1)+(key+1);
					console.log(aA[key])
					console.log(""+(key+1)+(key+1))
				}
			})
			this.setState({
				arr:arr
			})
		},0)
	}
    render(){
        return (
            <ul className="footer">
        	<li>
				<Link to="/home" activeClassName="current" onClick={this.changeUrl.bind(null,"1")}>
        			<img src={"src/assets/images/"+this.state.arr[0]+".png"} />
        			<p>首页</p>
				</Link>
        	</li>
        	<li>
        		<Link to="/category" activeClassName="current" onClick={this.changeUrl.bind(null,"2")}>
        			<img src={"src/assets/images/"+this.state.arr[1]+".png"} />
					<p>分类</p>
        		</Link>
        	</li>
        	<li>
				<Link to="/cart" activeClassName="current" onClick={this.changeUrl.bind(null,"3")}>
        			<img src={"src/assets/images/"+this.state.arr[2]+".png"}/>
        			<p>购物车</p>
				</Link>
        	</li>
        	<li>
				<Link to={this.state.userName?{pathname:'/user'}:{pathname:'/login'}} activeClassName="current" onClick={(ev)=>{this.changeUrl("4")}}>
        			<img src={"src/assets/images/"+this.state.arr[3]+".png"} />
        			<p>个人中心</p>
				</Link>
        	</li>
        </ul>
        )
    }
}

