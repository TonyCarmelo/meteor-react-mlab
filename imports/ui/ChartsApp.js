import React, {Component, PropTypes} from 'react';
import Header from './Header';
import MemberShip from './MemberShip'
import ChartComponent from './ChartComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createContainer } from 'meteor/react-meteor-data';

import { Partners } from '../api/partners.js';
import { Users } from '../api/users.js';
import { Rides } from '../api/rides.js';
import { Posts } from '../api/drives.js';
import { Meteor } from 'meteor/meteor';

import {Session} from 'meteor/session';

let dataSource = {};

class ChartsApp extends Component{

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
			students:{
				title: "Students",
				statistics:"0",
				imageName: "/users.png"
			},
			drives:{
				title: "Drives Posted",
				statistics: "0",
				imageName: "/car.png"
			},
			rides:{title: "Rides Posted",
					statistics: "0",
					imageName: "/car.png"},
			_id: FlowRouter.current().params._partner,
			_city: FlowRouter.current().queryParams.city,
			_partner: FlowRouter.current().queryParams.partner,
		}

	}

	getPartnerCity(){
		//console.log)
		return this.state._city;
	}

	getPartnerName(){
		return this.state._partner;
	}

	getStudentsData(){
		let instance = this;

		Meteor.call('users.countByCity', this.state._partner, function(err, res){
			if(err) return console.log(err);
			instance.setState({
						students: {title: "Students",
									statistics: res,
									imageName: "/users.png"}
					});
		});
	}

	getDrivesPostData(){
		let instance = this;

		Meteor.call('drives.countByCity',this.state._city, function(err, res){
			if(err) return console.log(err);

			instance.setState({drives: {
				title: "Drives Posted",
				statistics: res,
				imageName: "/car.png",
			}});
		});

	}

	getRidesPostData(){
		let instance = this;

		Meteor.call('rides.countByCity',this.state._city, function(err, res){
			if(err) return console.log(err);
			instance.setState({rides: {
					title: "Rides Posted",
					statistics: res,
					imageName: "/car.png",
				} });
		});
	}

	componentWillMount(){
		if(Session.get('partner') == null || Session.get('partner') == ""){
			FlowRouter.go("/");
			document.location.reload();
		}
		this.getStudentsData();
		this.getDrivesPostData();
		this.getRidesPostData();
	}
	render(){
			return(
				<MuiThemeProvider>
					<div>
						<Header name={this.getPartnerName()}/>

						<MemberShip students={this.state.students} drives={this.state.drives} rides={this.state.rides} parent={this} />

						<ChartComponent config={this.state.config} _partner={this.state._partner} />
					</div>
				</MuiThemeProvider>
			);
	}
}



ChartsApp.propTypes = {
	partners: PropTypes.array.isRequired,
	users: PropTypes.array.isRequired,
	rides: PropTypes.array.isRequired,
	drives: PropTypes.array.isRequired,
}

export default createContainer(()=>{
	Meteor.subscribe('users');
	Meteor.subscribe('partners');
	Meteor.subscribe('drives');
	Meteor.subscribe('rides');

	return {
	    partners: Partners.find({}).fetch(),
	    users: Users.find({}).fetch(),
	    rides: Rides.find({}).fetch(),
	    drives: Posts.find({}).fetch(),
  	};
}, ChartsApp);


