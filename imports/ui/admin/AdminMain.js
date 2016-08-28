import React, {Component, PropTypes} from 'react';
import Header from '../Header';
import AdminContent from './AdminContent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export default class AdminMain extends Component{
   constructor(){
      super();
   }

   componentWillMount(){
       if(Session.get('admin') == null || Session.get('admin') == "")
      {
         FlowRouter.go("/adminlogin");
         document.location.reload();
      }
   }

   render(){
      if(Session.get('admin') == null || Session.get('admin') == "")
      {
         return FlowRouter.go("/adminlogin");
      }
      return (
         <MuiThemeProvider>
            <div>
               <Header name="ADMIN"/>
               <AdminContent />
            </div>
         </MuiThemeProvider>);
   }
}