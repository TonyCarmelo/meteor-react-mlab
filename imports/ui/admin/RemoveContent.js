import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import { Partners } from '../../api/partners.js';
import ReactDOM from 'react-dom';
import BackBar from './BackBar.js';
import RemoveComponent from './RemoveComponent.js';
import RemoveList from './RemoveList.js';

export default class RemoveContent extends Component{
   constructor(){
      super();

      this.state = {
         partners: [],
      }
   }

   handleClick(){
      console.log("");
   }

   handleSelect(id){
      var myArray = this.state.partners.filter(function( obj ) {
          return obj._id !== id;
      });
      this.setState({partners: myArray});
   }


   getPartnerData(){
      let instance = this;

      Meteor.call('partners.get', function(err, res){
         if(err) return console.log(err);
         instance.setState({partners: res});
      });
   }

   componentWillMount(){
      this.getPartnerData();
   }

   render(){
      return(
            <div>
               <BackBar onClick={this.props.onBack.bind(this)}/>

               <div className="newClassUnderBar">
                  <RemoveComponent onClick={this.handleClick.bind(this)}/>
               </div>

               <RemoveList onSelect={this.handleSelect.bind(this)} partners={this.state.partners}/>

            </div>
         )
   }
}

RemoveContent.propTypes = {
   onBack: PropTypes.func.isRequired,
}