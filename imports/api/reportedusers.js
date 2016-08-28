/*
* @Author: root
* @Date:   2016-08-23 01:20:37
* @Last Modified by:   root
* @Last Modified time: 2016-08-23 01:21:51
*/

'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ReportedUsersApi = new Mongo.Collection('ReportedUsers');

if(Meteor.isServer){

	Meteor.methods({
		'reported.getAllUsers'(){
			return ReportedUsersApi.find({}).fetch();
		}
	})
}