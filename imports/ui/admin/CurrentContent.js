import React, {Component, PropTypes} from 'react';
import BackBar from './BackBar.js';
import CurrentComponent from './CurrentComponent';
import CurrentList from './CurrentList.js';
import ListComponent from './ListComponent.js';
import CurrentListEdit from './CurrentListEdit.js';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {AutoComplete, TextField, RaisedButton} from 'material-ui';

import { Meteor } from 'meteor/meteor';
import { Partners } from '../../api/partners.js';

var renderString="";
export default class CurrentContent extends Component{
   constructor(){
      super();

      this.state={
         editOrList: false,
         selectedPartner: {},
         partners: [],
      }
      this.getImageText = this.getImageText.bind(this);
   }

   handleClick(){
   }
   handleSelect(val){
      var object= JSON.parse(val);
      this.setState({selectedPartner: object, editOrList: true});
      renderString = this.renderedit(object);
      this.render();
   }

   getImageText(cityString){
      var [first, second] = cityString.split(' ', 2);
      if((second == null) || (second == "")){
         return first.charAt(0).toUpperCase();
      }else{
         return first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase();
      }
   }

   getPartnerData(){
      let instance = this;

      Meteor.call('partners.get', function(err, res){
         if(err) return console.log(err);
         instance.setState({partners: res});
      });
   }

   getDate(dateString){
      var date = new Date(Date.parse(dateString));
      return date.toDateString().substring(3);
   }

   componentWillMount(){
      this.getPartnerData();
      renderString = this.renderlist()
   }

   renderlist(){
      return(
            <div>
               <div className="newClassUnderBar">
                  <CurrentComponent onClick={this.handleClick.bind(this)}/>
               </div>

               <CurrentList onSelect={this.handleSelect.bind(this)} partners={this.state.partners}/>
            </div>
         );
   }

   renderedit(partner){
      return(
         <div>
            <div className="newClassUnderBar">
               <ListComponent imgText={this.getImageText(partner.city)} size={150} text={partner.partner} existing={true} auxText={this.getDate(partner._created_at)} onClick={this.handleClick.bind(this)} />
            </div>
            <div className="editContainer">
                <CurrentListEdit partner={partner} onCancelClick={this.props.onBack.bind(this)}/>
            </div>
         </div>
      );
   }
   render(){
      {this.state.editOrList ? renderString=this.renderedit(this.state.selectedPartner) :renderString = this.renderlist()}

      return(
            <div>
               <BackBar onClick={this.props.onBack.bind(this)}/>
               {renderString}
            </div>
         );
   }
}

CurrentContent.propTypes = {
   onBack: PropTypes.func.isRequired,
}