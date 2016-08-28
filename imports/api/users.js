import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Users = new Mongo.Collection('_User');

if(Meteor.isServer){
	Meteor.publish('users', function usersPublication(){
		return Users.find({});
	});

	Meteor.methods({
		'users.getByCity'(university, date_number){
			check(university, String);
			check(date_number, Number);
			let date = new Date((new Date())-1000*60*60*24*date_number);
			let result = Users.aggregate([
				{$match:
					{
						University: university,
						_created_at: { $gt: date}
					}
				},
				{$group:
					{
						// _id: {$dateToString:{format: "%w %d", date: "$_created_at" }},
						_id: {$dateToString:{format: "%m/%d/%Y", date: "$_created_at" }},
						y:{ $sum: 1}
					}

				},
				{$sort:
					{
						"_id": 1,
					}
				},
			])

			let data = result.map(item=>({
				x: new Date(item._id),
				y: item.y
			}));

			date = Math.min.apply(Math,data.map(function(o){return o.x;}))
			data.unshift({x: new Date(date), y: 0});

			return data;
		},

		'users.countByCity'(university){
			this.unblock();

			check(university, String);
			return Users.find({University: university}).count();
		},
		'users.dashboardRegistered'(){
			return Users.find({}).count();
		},
		'users.dashboardunverified'(){
			return Users.find({emailVerified: false}).count();	
		},
		'users.last7days'(){
			let date = new Date((new Date())-1000*60*60*24*7);
			return Users.find({_created_at: {$gt: date}}).count();
		},
		'users.getLast7daysUser'(){
			let date = new Date((new Date())-1000*60*60*24*7);
			let result = Users.aggregate([
				{$match:
					{
						_created_at: { $gt: date}
					}
				},
				{$group:
					{
						// _id: {$dateToString:{format: "%w %d", date: "$_created_at" }},
						_id: {$dateToString:{format: "%m/%d/%Y", date: "$_created_at" }},
						y:{ $sum: 1}
					}

				},
				{$sort:
					{
						"_id": 1,
					}
				},
			])

			let data = result.map(item=>({
				x: new Date(item._id),
				y: item.y
			}));

			date = Math.min.apply(Math,data.map(function(o){return o.x;}))
			data.unshift({x: new Date(date), y: 0});

			return data;
		},
		'users.getAllUsers'(){
			let users = Users.find({}, {"sort": {"_created_at": -1}});

			let data = users.map(item=>({
							email: item.email,
							name: item.fullName,
							university: item.University,
							verified: item.emailVerified,
							createAt: item._created_at,
						}))

			return data;
		},
		'users.getUnverifiedUsers'(){
			let users = Users.find({emailVerified: false},{$sort: {"_created_at": 1}});

			let data = users.map(item=>({
							email: item.email,
							name: item.fullName,
							university: item.University,
							createAt: item._created_at,
						}))

			return data;	
		},
		'users.getAll'(){
			return Users.find({}).fetch();
		}
	});
}
