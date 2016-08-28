import { Meteor } from 'meteor/meteor';

import '../imports/api/partners.js';
import '../imports/api/users.js';
import '../imports/api/drives.js';
import '../imports/api/rides.js';
import '../imports/api/commnts.js';
import '../imports/api/reportedusers.js';
import '../imports/api/conversations.js';
import '../imports/api/externalapi.js';
import './mandrill.js';

Meteor.startup(() => {
  // code to run on server at startup
  // process.env.MAIL_URL = 'smtp://Rydite, Inc.:Mkl0miAshDZYMBgQDFdZ-A@smtp.mandrillapp.com:587';
  // process.env.MANDRILL_API_USER = 'contact@rydite.com';
  // process.env.MANDRILL_API_KEY = 'Mkl0miAshDZYMBgQDFdZ-A';

  // return Meteor.Mandrill.config({
  //  host: "smtp.mandrillapp.com",
  //  port: "587",
  //  username: process.env.MANDRILL_API_USER,
  //  key: process.env.MANDRILL_API_KEY
  // })
 // process.env.MONGO_URL="mongodb://admin:123456@ds023732-a0.mlab.com:23732,ds023732-a1.mlab.com:23732/rydite?replicaSet=rs-ds023732";
});

