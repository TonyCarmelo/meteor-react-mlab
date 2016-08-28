import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Rides = new Mongo.Collection('Rides');

if(Meteor.isServer){
	Meteor.publish('rides', function ridesPublication(){
		return Rides.find({});
	});

}


Meteor.methods({
   'rides.countByCity'(city){
      check(city, String);
      var value = "0";
      value = Rides
            .find({
               $or:[
                  {from: {'$regex': city}},
                  {destination: {'$regex': city}}
               ]
            })
            .count();

      return value;
   }
});