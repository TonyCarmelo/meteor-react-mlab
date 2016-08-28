import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Posts = new Mongo.Collection('Posts');

if(Meteor.isServer){
	Meteor.publish('Posts', function postsPublication(){
		return Posts.find({});
	});
}

Meteor.methods({
	'drives.countByCity'(city){
		check(city, String);
		return Posts.find({$or:[
									{from: {'$regex': city}},
									{destination: {'$regex': city}}
								]
							}).count();
	}

});