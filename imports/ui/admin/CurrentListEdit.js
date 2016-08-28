import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import {AutoComplete, TextField, RaisedButton} from 'material-ui';
import ImageEdit from 'material-ui/svg-icons/image/edit';

export default class CurrentListEdit extends Component{
   constructor(){
      super()
      this.state = {
         id: "",
         fullname: '',
         position: '',
         email: '',
         phoneNum: '',
         partner: '',
         city: '',
         buttonLabel: 'Edit',
         enableEdit: false,
         errorUniversityText: '',
         errorCityText: '',
      }
   }

   componentWillMount(){
      this.setState({id: this.props.partner._id});
      this.setState({fullname: this.props.partner.fullname});
      this.setState({position: this.props.partner.position});
      this.setState({email: this.props.partner.email});
      this.setState({phoneNum: this.props.partner.phoneNum});
      this.setState({partner: this.props.partner.partner});
      this.setState({city: this.props.partner.city});
   }

   handleFullNameChange(e){
      this.state.enableEdit ? this.setState({fullname: e.target.value}) : '';
   }

   handlePositionChange(e){
      this.state.enableEdit ? this.setState({position: e.target.value}) : '';
   }

   handlePhoneNumChange(e){
      this.state.enableEdit ? this.setState({phoneNum: e.target.value}) : '';
   }

   handleEmailChange(e){
      this.state.enableEdit ? this.setState({email: e.target.value}) : '';
   }
   handleUniversityChange(e){
      this.state.enableEdit ? this.setState({partner: e.target.value}) : '';
   }

   handleCityChange(e){
      this.state.enableEdit ? this.setState({city: e.target.value}) : '';
   }
   handleEditButtonClick(){
      if(this.state.enableEdit == false){
         this.setState({buttonLabel:"Save", enableEdit: true});
      }else{
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
            let instance = this;
            Meteor.call('partners.update',this.state.id, partner, function(err, res){
               if(err) console.log(err);
               instance.setState({buttonLabel: "Edit", enableEdit: false});
               instance.props.onCancelClick();
            });

         }
      }
   }

   render(){
      return(
            <div className="CurrentEditContainer">
               <div className="editButtonContainer">
                  <RaisedButton label={this.state.buttonLabel} className="editButtonClass" labelPosition="before" icon={<ImageEdit />} onClick={this.handleEditButtonClick.bind(this)} />
               </div>

               <div className="editTitle">
                  <div className="editlink">Admin Details</div>
               </div>

               <div className="editSubContainer">
                   <div className="editWidget">
                     <img src="/profile.png" width="20" />
                     <TextField type='text' className="inputTextField" placeholder="FULL NAME" ref="fullname" id="fullname" name="fullname" fullWidth={true} underlineFocusStyle={{borderColor: "black"}} value={this.state.fullname ? this.state.fullname : ''} underlineStyle={{borderColor: "black"}} onChange={this.handleFullNameChange.bind(this)}/>
                  </div>
                  <div className="editWidget">
                     <TextField type='text' className="inputTextField nonMargin" placeholder="POSITION" ref="position" id="position" name="position" fullWidth={true} underlineFocusStyle={{borderColor: "black"}}  underlineStyle={{borderColor: "black"}} value={this.state.position ? this.state.position : ''}  onChange={this.handlePositionChange.bind(this)}/>
                  </div>
               </div>

               <div className="editSubContainer">
                  <div className="editWidget">
                     <img src="/phone.png" width="20" />
                     <TextField type='text' className="inputTextField" placeholder="PHONE NUMBER" ref="phoneNum" id="phoneNum" name="phoneNum" fullWidth={true} underlineFocusStyle={{borderColor: "black"}}  underlineStyle={{borderColor: "black"}} value={this.state.phoneNum ? this.state.phoneNum : '' }  onChange={this.handlePhoneNumChange.bind(this)}/>
                  </div>
                  <div className="editWidget">
                     <img src="/email.png" width="20" />
                     <TextField type='text' className="inputTextField" placeholder="EMAIL" ref="email" id="email" name="email" fullWidth={true} underlineFocusStyle={{borderColor: "black"}}  underlineStyle={{borderColor: "black"}} value={this.state.email? this.state.email : ''}  onChange={this.handleEmailChange.bind(this)}/>
                  </div>
               </div>

               <div className="editSubContainer">
                  <div className="editWidget">
                     <img src="/schoolicon.png" width="20" />
                     <TextField type='text' className="inputTextField" placeholder="UNIVERSITY" ref="university" id="university" name="university" fullWidth={true} underlineFocusStyle={{borderColor: "black"}}  underlineStyle={{borderColor: "black"}} value={this.state.partner}  onChange={this.handleEmailChange.bind(this)}  errorText={this.state.errorUniversityText}/>
                  </div>
                  <div className="editWidget">
                     <img src="/building icon.png" width="20" />
                     <TextField type='text' className="inputTextField" placeholder="CITY" ref="city" id="city" name="city" fullWidth={true} underlineFocusStyle={{borderColor: "black"}} underlineStyle={{borderColor: "black"}} value={this.state.city}  onChange={this.handleCityChange.bind(this)} errorText={this.state.errorCityText}/>
                  </div>
               </div>
            </div>
         );
   }
}

CurrentListEdit.propTypes = {
   partner: PropTypes.object.isRequired,
   onCancelClick: PropTypes.func.isRequired,
}