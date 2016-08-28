import React, {Component, PropTypes} from 'react';
import Header from '../Header';
import ChartDashboardMemberShip from './ChartDashboardMemberShip'
import ChartDashboardDisplay from './ChartDashboardDisplay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createContainer } from 'meteor/react-meteor-data';

import { Partners } from '../../api/partners.js';
import { Users } from '../../api/users.js';
import { Rides } from '../../api/rides.js';
import { Posts } from '../../api/drives.js';
import { Meteor } from 'meteor/meteor';

import {Session} from 'meteor/session';

let dataSource = {};

export default class ChartDashboard extends Component{

	constructor(props){
		super(props);
		//console.logFlowRouter.current())
		this.state={
			name: "San Francisco",
			lineData: [ { _id: 0, y: 20 }, { _id: 20, y: 10 },{ _id: 10, y: 30 },{ _id: 50, y: 20 }, { _id: 24, y: 10 } ],
			config:{
			  	x: 0,
			  	y: 0,
			  	width: 700,
			  	height: 400,
			},
			registered:{
				title: "Registered Users",
				statistics:"0",
				imageName: "/users.png"
			},
			unverified:{
				title: "Unverified Users",
				statistics: "0",
				imageName: "/users.png"
			},
			last:{title: "Last 7 days",
					statistics: "0",
					imageName: "/users.png"},			
		}

	}
	getregisteredUsersData(){
		let instance = this;

		Meteor.call('users.dashboardRegistered', function(err, res){
			if(err) return console.log(err);
			instance.setState({
						registered: {title: "Registered Users",
									statistics: res,
									imageName: "/users.png"}
					});
		});
	}

	getUnverifiedUsersData(){
		let instance = this;

		Meteor.call('users.dashboardunverified', function(err, res){
			if(err) return console.log(err);

			instance.setState({unverified:{
				title: "Unverified Users",
				statistics: res,
				imageName: "/users.png"
			}});
		});

	}

	getLast7daysData(){
		let instance = this;

		Meteor.call('users.last7days', function(err, res){
			if(err) return console.log(err);
			instance.setState({last:{title: "Last 7 days",
					statistics: res,
					imageName: "/users.png"} });
		});
	}

	componentWillMount(){		
		this.getregisteredUsersData();
		this.getUnverifiedUsersData();
		this.getLast7daysData();
	}
	render(){
			return(
					<div className="chartDashboardMain">
						<div className="chartDashboardTitle">
							<p><img src="/dashboard icon title.png" /> Dashboard </p>
						</div>

						<ChartDashboardMemberShip registered={this.state.registered} unverified={this.state.unverified} last={this.state.last} parent={this} />

						<ChartDashboardDisplay config={this.state.config} _partner={this.state._partner} />
					</div>
			);
	}
}


