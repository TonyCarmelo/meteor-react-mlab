import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';
import {AutoComplete, TextField, RaisedButton} from 'material-ui';

export default class AdminLogin extends Component{
   constructor(){
      super();
      this.state = {
         enable: false,
         errorUserNameText: "",
         errorPasswordText: "",
      }
      this.login = this.login.bind(this);
   }

   login(){
      let username = this.refs.username.getValue();
      let password = this.refs.password.getValue();
      if((username.length == 0) && (password.length == 0)){
         this.setState({errorPasswordText: "The password is required!"});
         this.setState({errorUserNameText: "The username is required!"});
      }
      if(this.refs.password.getValue().length > 5){
         this.setState({errorPasswordText: ""})
       }else{
         this.setState({errorPasswordText: "The length of password cannot be less than 6!"})
       }

       //login confirm with data from database
      if(password.length > 5 ){
         if((password == 'ryditedash2016') && (username='admin')){
            Session.set('admin', 'admin');
            return FlowRouter.go("/adminmain");
         }else{

         }
      }
   }

   validatePassword(){
      this.setState({errorPasswordText: ""})
      if(this.refs.password.getValue().length == 0){
         this.setState({errorPasswordText: "The password is required!"})
      }
   }

   validateUserName(){
      this.setState({errorUserNameText: ""})
   }

   render(){
      return(
            <div className="component adminLoginComponent">
               <div className="brandRImage">
                <img src="/ryditelogo.png" width="80" height="80" />
                </div>
                <div className="DefaultPin">
                  <TextField type='text' placeholder="USERNAME" ref="username" id="username" name="username" fullWidth={true} underlineFocusStyle={{borderColor: "rgb(225, 114,89)"}} onChange={this.validateUserName.bind(this)} errorText={this.state.errorUserNameText} />
                </div>

                <div>
                  <TextField type='password' ref="password" placeholder="PASSWORD" name="password" id="password"  fullWidth={true}  underlineFocusStyle={{borderColor: "rgb(225, 114,89)"}} onChange={this.validatePassword.bind(this)}  errorText={this.state.errorPasswordText}/>
                </div>

                <div>
                  <RaisedButton label="Log In" className="adminLoginButton" fullWidth={true} onClick={this.login} disabled={this.state.enable} />
                </div>
            </div>
         );
   }
}