import React,{Component,PropTypes} from 'react';
import {Session} from 'meteor/session';

export default class Header extends Component{
	constructor(){
		super();

		this.state={
			name: "San Francisco",
			nowtime: new Date(),
		}
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout(){
		Session.set('admin', null);
		return FlowRouter.go("/");
		document.location.reload();
	}

	render(){
		let _this = this;
		return(
			<div className="headerbar">
				<div className="leftLogo">
					<div>
						<div className="img">
							<img src="/ryditelogo.png" width="30" height="30" />
						</div>
						<div className="label1">
							<label> | {this.props.name} </label>
						</div>
					</div>
				</div>

				<div className="middleDate">
					<h2>{this.state.nowtime.toDateString()} </h2>
				</div>

				<div className="logout">
					<a className="logoutButton" href="#"><h2  onClick={this.handleLogout}>Logout</h2></a>
				</div>
			</div>
			);
	}
}

Header.propTypes={
	name: PropTypes.string.isRequired,
}