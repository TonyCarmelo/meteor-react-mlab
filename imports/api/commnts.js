import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Commnts = new Mongo.Collection('ReportedComments');

if(Meteor.isServer){

	Meteor.methods({
		'commnts.getAllCommnts'(){
			return Commnts.find({}).fetch();
		}
	})
}