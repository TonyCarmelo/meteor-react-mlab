import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AutoComplete, TextField, RaisedButton} from 'material-ui';
import {Partners} from '../api/partners.js';
import {Meteor} from 'meteor/meteor';

export default class ForgetPinApp extends Component{

   constructor(props){
      super(props);
      this.state = {
         textStatus: "",
         buttonStyle:{
            margin: 12,
           color: 'pink',
           fill: 'green',
           backgroundColor: 'green'
         },
         _id: FlowRouter.current().params._partner,
         _partner: FlowRouter.current().queryParams.city,
         label: "Reset Pin",
         resetOrBack: false,
      }
      this.handleResetPin  = this.handleResetPin.bind(this);
      this.handleGotoLogin = this.handleGotoLogin.bind(this);
   }

   handleResetPin(){
      this.setState({textStatus: "We will be reaching out to you with your new pin shortly!"})
      this.setState({resetOrBack: true});
      Meteor.call('sendEmail', 'kareem.khattab@rydite.com', 'contact@rydite.com', 'A Rydite Partner Forgotten Password', this.state._partner);
   }

   handleGotoLogin(){
      FlowRouter.go('/');
      this.setState({resetOrBack: false})
   }
   // moo
   render(){
    return(
        <MuiThemeProvider>
         <div className="component">
           <div className="brandRImage">
             <img src="/ryditelogo.png" width="80" height="80" />
           </div>
           <div className="textStatus">
             <p>{this.state.textStatus}</p>
           </div>
           {this.state.resetOrBack ?
               <div>
                  <RaisedButton label="Back to Log In" className="loginButton" style={this.state.buttonStyle} backgroundColor="rgb(225, 114, 89)" labelColor="white"  onClick={this.handleGotoLogin}  fullWidth={true} />
               </div>
               :
               <div>
                  <RaisedButton label="Request Pin" className="loginButton" style={this.state.buttonStyle} backgroundColor="rgb(225, 114, 89)" labelColor="white"  onClick={this.handleResetPin}  fullWidth={true} />
               </div>
           }

        </div>
      </MuiThemeProvider>
      )
   }
}


