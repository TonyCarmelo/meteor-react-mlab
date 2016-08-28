import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import { Partners } from '../../api/partners.js';
import {AutoComplete, TextField, RaisedButton} from 'material-ui';

export default class AddNewFormContent extends Component{
   constructor(){
      super();

      this.state = {
         successOrFail: "",
         errorCityText: "",
         errorUniversityText: "",
      }
   }

   cancelAddNew(){
      this.props.onCancelClick();
   }

   handleCreate(){
      let fullname = this.refs.fullname.getValue();
      let position = this.refs.position.getValue();
      let email = this.refs.email.getValue();
      let phoneNum = this.refs.phoneNum.getValue();
      let university = this.refs.university.getValue();
      let city = this.refs.city.getValue();

      if((university.length == 0) || (city.length == 0)){
         university.length ? this.setState({errorUniversityText: ""}) : this.setState({errorUniversityText: "This field is required!"});
         city.length ? this.setState({errorCityText: ""}) : this.setState({errorCityText: "This field is required!"});
      }else{
         var partner = {
            fullname: fullname,
            position: position,
            email: email,
            phoneNum: phoneNum,
            partner: university,
            city: city,
         };

         Meteor.call('partners.create', partner);
         this.props.onCancelClick();
      }
   }
   render(){
      return(<div className="newFormContainer">
               <div className="newFormSubContainer">
                  <div className="inputWidget inputLeft">
                     <TextField type='text' placeholder="FULL NAME" ref="fullname" id='text' name='text' fullWidth={true} underlineFocusStyle={{borderColor: "black"}} underlineStyle={{borderColor: "black"}}/>
                  </div>
                  <div className="inputWidget inputRight">
                     <TextField type='text' placeholder="POSITION" ref="position" fullWidth={true} id='text' name='text' underlineFocusStyle={{borderColor: "black"}} underlineStyle={{borderColor: "black"}}/>
                  </div>
               </div>

               <div className="newFormSubContainer">
                  <div className="inputWidget inputLeft">
                     <TextField type='text' placeholder="PHONE NUMBER" ref="phoneNum" id='text' name='text' fullWidth={true} underlineFocusStyle={{borderColor: "black"}} underlineStyle={{borderColor: "black"}}/>
                  </div>
                  <div className="inputWidget inputRight">
                     <TextField type='text' placeholder="EMAIL" ref="email" id='text' name='text' fullWidth={true} underlineFocusStyle={{borderColor: "black"}} underlineStyle={{borderColor: "black"}}/>
                  </div>
               </div>

               <div className="newFormSubContainer">
                  <div className="inputWidget inputLeft">
                     <TextField type='text' placeholder="UNIVERSITY" ref="university" id='text' name='text' fullWidth={true} underlineFocusStyle={{borderColor: "black"}} errorText={this.state.errorUniversityText} underlineStyle={{borderColor: "black"}}/>
                  </div>
                  <div className="inputWidget inputRight">
                     <TextField type='text' placeholder="CITY" ref="city" id='text' name='text' fullWidth={true} underlineFocusStyle={{borderColor: "black"}} errorText={this.state.errorCityText} underlineStyle={{borderColor: "black"}}/>
                  </div>
               </div>


               <div className="newFormButton">
                  <div className="inputButton">
                     <RaisedButton label="Create" className="createButtonClass" onClick={this.handleCreate.bind(this)} />
                  </div>

                  <div className="inputButton">
                     <RaisedButton label="Cancel" className="cancelButtonClass" backgroundColor="rgb(225,114,89)" labelColor="white" onClick={this.cancelAddNew.bind(this)}/>
                  </div>
               </div>
            </div>
         );
   }
}

AddNewFormContent.propTypes = {
   onCancelClick: PropTypes.func.isRequired,
}