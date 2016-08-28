/*
* @Author: frans870503
* @Date:   2016-08-23 02:33:28
* @Last Modified by:   frans870503
* @Last Modified time: 2016-08-23 02:34:21
*/

import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';

let settings = Meteor.settings.private.quickBlox;


Meteor.methods({
	'quickBlox.createSession'(){
		let application_id=settings.app_id,
			auth_key=settings.auth_key,
			auth_secret = settings.auth_secret,
			timestamp = new Date(),
			nonce = "33234",
			login = settings.user,
			password = settings.password,
			message = "application_id="+application_id+"&auth_key="+auth_key+"&nonce="+nonce+"&timestamp="+timestamp,
			signature = CryptoJS.HmacSHA1(message, auth_secret).toString(),
			token='';

		HTTp.call('POST', 'https://api.quickblox.com/session.json', {
			headers:{
				"Content-Type":"application/json",
				"QuickBlox-REST-API-Version":"0.1.0"
			},
			data:{
				"application_id": application_id, 
				"auth_key": auth_key,
				"timestamp": timestamp, 
				"nonce": nonce,
				"signature": signature
			}
		}, function(err, response){
			if ( error ) {
				console.log( error );
			} else {
				console.log( response );

				Session.set('token', response.session.token);
				token = response.session.token;
			}	
		});	

		return token;
	},
	'quickblox.destoryToken'(){
		let token = Session.get('token');

		HTTP.call('DELETE', 'https://api.quickblox.com/session.json', {
			headers:{
				"QuickBlox-REST-API-Version":"0.1.0",
				"QB-Token":token
			}
		})
	},
	'quickblox.login'(){
		let user=settings.user,
			password=settings.password;
			token = Session.get('token');
		HTTP.call('POST', 'http://api.quickblox.com/login.json', {
			headers:{
				"Content-Type":"application/json",
				"QuickBlox-REST-API-Version":"0.1.0",
				"QB-Token":token
			},
			data:{
				"login":user,
				"password":password
			}
		}, function(err, res){
			if ( error ) {
				console.log( error );
			} else {
				console.log( response );

			}	
		})

	},
	// 'quickblox.getContent'(id){
	// 	let token = Session.get('token');


	// }
})