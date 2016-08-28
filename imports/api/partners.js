import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import {email} from 'meteor/email';

export const Partners = new Mongo.Collection('Partners');

if(Meteor.isServer){

	Meteor.publish('partners', function partnersPublication(){
		return Partners.find({});
	})

	Meteor.methods({
		'partners.get'(){
			return Partners.find({}).fetch();
		},
		'partners.remove'(id){
			check(id, String);

			Partners.remove(id);
		},
		'partners.create'(partner){
			check(partner.partner, String);
			check(partner.city, String);

			partner._created_at = new Date();
			partner._updated_at = "";

			Partners.insert(partner);
		},
		'partners.update'(id, partner){
			check(id, String);
			check(partner.partner, String);
			check(partner.city, String);

			partner._updated_at = new Date();

			Partners.update({_id: id},{$set: partner});
			return true;
		},
		'partners.getCiryById'(id){
			check(id, String);

			return "KKK";
		},
		'partners.getPartnerById'(id){
			check(id, String);
			return Partners.findOne({}).fetch();
		},
		'partners.updatebyId'(id, pin){
			check(id, String);
			check(pin, String);

			Partners.update(id, {$set: {pin: pin, _updated_at: new Date()}})
		},
		'sendEmail'(to, from, subject, text) {
		    check([to, from, subject, text], [String]);
		    this.unblock();

		    Mandrill.messages.send({
				  message: {
				    "text": text,
				    "from_email": from,
				    "from_name": "Partner Dashboard",
				    "subject": subject,
				    "to": [
				      { email: to, name: "Kareem Kareem" }
				    ]
				  }
				}, function( error, response ) {
				  if ( error ) {
				  } else {
				  }
				});
		  }
	})
}
