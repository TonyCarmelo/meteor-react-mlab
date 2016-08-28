// React instance
import React , {Component, PropTypes} from 'react';


import { createContainer } from 'meteor/react-meteor-data';

// Manage Collection of remote mongodb
import { Partners } from '../api/partners.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// Import of React Component : Material-UI
import {AutoComplete, TextField, RaisedButton} from 'material-ui';
import {orange500, blue500} from 'material-ui/styles/colors';

// Import the operation of array.
import '../module/array.js';


let dataSource = null;
// Main class
class SchoolDropDown extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      dataSourceConfig: {
      	text: "partner",
      	value: "partner",
      },
      buttonStyle:{
      	margin: 12,
        color: 'pink',
        fill: 'green',
        backgroundColor: 'green'
      },
      showPin: false,
      logOrSign: false,
      enableButton: true,
      selectedItem: {},
      confirmDefaultPin: true,
      textStatus: "",
       floatingLabel: {
        color: "#451223",
        pointerEvents: 'none',
      },
    }

    this.itemSeleted = this.itemSeleted.bind(this)
    this.validateOnlyNumber = this.validateOnlyNumber.bind(this)
    this.handleLoginOrSignup = this.handleLoginOrSignup.bind(this)
    this.validateButton = this.validateButton.bind(this)
    this.validateForButton = this.validateForButton.bind(this)
    this.validateConfirm = this.validateConfirm.bind(this)
    this.validateConfirmTextField = this.validateConfirmTextField.bind(this);
    this.displayForget = this.displayForget.bind(this)
  }


//++++++++++++++++++++++++++++++++++++++++++ Get data from partner collection in remote db ++++++++++++
  getPartnersData(){
    dataSource = this.props.partners;
    return dataSource;
  }

// Check value
  isMemberOfTypedString(value){
    if (value == "" || value == null || value == undefined){
      return false;
    }else{
      return true;
    }
  }

  itemSeleted(chosenRequest, index){
  	if (this.isMemberOfTypedString(chosenRequest.pin)){

  	  	this.setState({showPin: true, logOrSign: false})
  	  	this.setState({selectedItem:chosenRequest})
  	}else{
      this.setState({showPin: true, logOrSign: true})
      this.setState({selectedItem:chosenRequest})
    }
  }

// validation
  validateOnlyNumber(e){
  	const re = /[0-9]+/g;

    if (!re.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  }

  validateForButton(){
  	this.validateButton();
  }

  validateButton(){
  	if(!this.state.showPin){
  		this.setState({enableButton: true})
  	}else{
  		const text= this.refs.loginPin.getValue();
  		if(text.length == 4){
  			this.setState({enableButton: false})
  		}else{

  			this.setState({enableButton: true})
  		}
  	}
  }

  validateConfirm(){
    const defaultValue = this.refs.defaultPin.getValue();
    const text = this.refs.confirmPin.getValue();
    if(text == defaultValue){
      this.setState({enableButton: false})
    }else{
      this.setState({enableButton: true})
    }

  }

  validateConfirmTextField(){
    if(this.refs.defaultPin.getValue().length > 3){
      this.setState({confirmDefaultPin: false})
    }else{
      this.setState({confirmDefaultPin: true})
    }
  }

  handleLoginOrSignup(){
  	if(!this.state.showPin){
  		return false;
  	}
  	if(this.state.showPin && !this.state.logOrSign){
      if (this.confirmLogin()){
        const params = { _partner: this.state.selectedItem._id }
        const queryParams = {
                              city: this.state.selectedItem.city,
                              partner: this.state.selectedItem.partner
                            }
        Session.set('partner', this.state.selectedItem._id);
        return FlowRouter.go('/view/:_partner', params, queryParams)
      }else{
        this.setState({textStatus: "Please type the pin number correctly...."})
      }
  	}
  	if(this.state.showPin && this.state.logOrSign){
      if (this.confirmSignUp()){
        const params = { _partner: this.state.selectedItem._id }
        const queryParams = {
                              city: this.state.selectedItem.city,
                              partner: this.state.selectedItem.partner
                            }
        Session.set('partner', this.state.selectedItem._id);
        return FlowRouter.go('/view/:_partner', params, queryParams)
      }else{
        this.setState({textStatus: "Please type all info correctly...."})
      }
  	}
  }

  confirmLogin(){
    const pinNumber = this.refs.loginPin.getValue();
    if(pinNumber == this.state.selectedItem.pin){
      return true;
    }else{
      return false;
    }
  }

  confirmSignUp(){
    if(this.refs.defaultPin.getValue() == this.refs.confirmPin.getValue()){
      //update
      const university = this.state.selectedItem.partner;
      const pin = this.refs.confirmPin.getValue();

      Meteor.call('partners.updatebyId', this.state.selectedItem._id, pin)

      return true;
    }else{
      return false;
    }
  }


  displayForget(){
    const params = { _partner: this.state.selectedItem._id }
    const queryParams = {
                            city: this.state.selectedItem.city,
                            partner: this.state.selectedItem.partner
                          }
    this.setState({logOrSign: true});
    return FlowRouter.go('/forgetpin/:_partner', params, queryParams);
  }

  adminLink(){
    return FlowRouter.go('/adminlogin');
  }

  render() {
    return (
      <div className="component">
        <div className="brandRImage">
          <img src="/ryditelogo.png" width="80" height="80" />
        </div>
        <div className="textStatus">
          <p>{this.state.textStatus}</p>
        </div>
        <div className="autocomplete">
          <AutoComplete
          floatingLabelFocusStyle={{color: "rgb(225, 114,89)"}}
  	      floatingLabelText="Enter School"
  	      filter={AutoComplete.caseInsensitiveFilter}
  	      openOnFocus={true}
  	      dataSource={this.getPartnersData()}
  	      dataSourceConfig={this.state.dataSourceConfig}
  	      onNewRequest={this.itemSeleted}
          fullWidth={true}
           underlineFocusStyle={{borderColor: "rgb(225, 114,89)"}}
  	    />
  	    </div>

	    {	this.state.showPin?
	    		<div className="inputPin">

	    			{this.state.logOrSign?
		    			<div>
				    	    <div className="DefaultPin">
				    	    	<TextField type='password' placeholder="Set First Pin Number"ref="defaultPin" id="DefaultPin" name="DefaultPin" maxLength="4" onKeyDown={this.validateOnlyNumber} fullWidth={true}  onChange={this.validateConfirmTextField} underlineFocusStyle={{borderColor: "rgb(225, 114,89)"}}/>
				    	    </div>

				    	    <div>
				    	    	<TextField type='password' ref="confirmPin" placeholder="Confirm pin number" name="ConfirmPin" id="ConfirmPin" maxLength="4" onKeyDown={this.validateOnlyNumber} onChange={this.validateConfirm} fullWidth={true}  underlineFocusStyle={{borderColor: "rgb(225, 114,89)"}} disabled={this.state.confirmDefaultPin}/>
				    	    </div>
			   			</div> :
			    	    <div>
			    	    	<TextField type='password' id="LoginPin" name="LoginPin" ref="loginPin" maxLength="4" onKeyDown={this.validateOnlyNumber} onChange={this.validateForButton} fullWidth={true} underlineFocusStyle={{borderColor: "rgb(225, 114,89)"}} >
                  </TextField>
			    	    </div>}
	    	    </div>
	    	     : ''
	    	}

	    <div>
	      <RaisedButton label="Log In" className="loginButton" style={this.state.buttonStyle} backgroundColor="rgb(225, 114, 89)" labelColor="white"  onClick={this.handleLoginOrSignup} disabled={this.state.enableButton} fullWidth={true} />
	    </div>

      { this.state.showPin?
          <div className="forgotpassword">
            {this.state.logOrSign?
              <div>
              </div> :
                <div>
                   <a href="#" onClick={this.displayForget}>Forgot Pin Number</a>
                </div>}
            </div>
             : <div className="adminLink">
                    <a href="#" onClick={this.adminLink}>Admin Login</a>
              </div>
        }

      </div>
    );
  }
}

SchoolDropDown.propTypes = {
  partners: PropTypes.array.isRequired,
}

export default createContainer(()=>{
  Meteor.subscribe('partners');

  return {
    partners: Partners.find({}).fetch(),
  };
}, SchoolDropDown)






