/*
* @Author: frans870503
* @Date:   2016-08-23 02:01:23
* @Last Modified by:   frans870503
* @Last Modified time: 2016-08-23 02:02:19
*/

'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ReportedConversationsApi = new Mongo.Collection('ReportedConversations');

if(Meteor.isServer){

	Meteor.methods({
		'conversations.getAllConv'(){
			return ReportedConversationsApi.find({}).fetch();
		}
	})
}