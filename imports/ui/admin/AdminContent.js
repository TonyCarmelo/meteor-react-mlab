import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {AutoComplete, TextField, RaisedButton} from 'material-ui';
import AddNewComponent from './AddNewComponent.js';
import CurrentComponent from './CurrentComponent.js';
import RemoveComponent from './RemoveComponent.js';
import AddNewContent from './AddNewContent.js';
import CurrentContent from './CurrentContent.js';
import RemoveContent from './RemoveContent.js';
import ViewChartComponent from './ViewChartComponent.js';
import ViewChartContent from './ViewChartContent.js';

export default class AdminContent extends Component{
   constructor(){
      super();

      this.state = {
         b_mainOrSub: false,
         flag_partner: 0,
      }

      this.handleCurrentPartner = this.handleCurrentPartner.bind(this);
      this.handleAddNewPartner = this.handleAddNewPartner.bind(this);
      this.handleRemovePartner = this.handleRemovePartner.bind(this);
      this.handleViewChart = this.handleViewChart.bind(this);
      this.handleBack = this.handleBack.bind(this);
   }

   handleCurrentPartner(){
      this.setState({b_mainOrSub: true, flag_partner: 2});
   }

   handleAddNewPartner(){
      this.setState({b_mainOrSub: true, flag_partner: 1});
   }

   handleRemovePartner(){
      this.setState({b_mainOrSub: true, flag_partner: 3});
   }

   handleBack(){
      this.setState({b_mainOrSub: false, flag_partner: 0});
   }

   handleViewChart(){
      this.setState({b_mainOrSub: true, flag_partner: 4});  
   }

   renderMainContent(){
         let content;
         switch (this.state.flag_partner){
            case 1:
               content = <AddNewContent onBack={this.handleBack}/>;
               break;
            case 2:
               content = <CurrentContent  onBack={this.handleBack}/>;
               break;
            case 3:
               content = <RemoveContent onBack={this.handleBack} />;
               break;
            case 4:
               content = <ViewChartContent onBack={this.handleBack} />;
               break;
            default:
               break;
         }
      return content;
   }

   renderMainComponent(){
      return(<div className="adminContainer">
               <div className="adminNewContent">
                  <div className="">
                     <AddNewComponent onClick={this.handleAddNewPartner}/>
                  </div>
               </div>
               <div className="adminCurrentContent">
                  <CurrentComponent onClick={this.handleCurrentPartner}/>
               </div>
               <div className="adminRemoveContent">
                  <div className="">
                     <RemoveComponent onClick={this.handleRemovePartner}/>
                  </div>
               </div>
               <div className="viewChartContent">
                  <div className="">
                     <ViewChartComponent onClick={this.handleViewChart}/>
                  </div>
               </div>
            </div>
         );
   }

   render(){
      return(<div>
               {this.state.b_mainOrSub ?
                  this.renderMainContent() :
                  this.renderMainComponent()}
            </div>

         );
   }
}