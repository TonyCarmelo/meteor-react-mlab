import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import { Partners } from '../../api/partners.js';
import ReactDOM from 'react-dom';
import SideBar from './SideBar.js';
import RemoveComponent from './RemoveComponent.js';
import RemoveList from './RemoveList.js';
import ChartDashboard from './ChartDashboard.js';
import ReportedUsers from './ReportedUsers.js';
import ReportedConversations from './ReportedConversations.js';
import ReportedComments from './ReportedComments.js';
import UnverifiedUsers from './UnverifiedUsers.js';
import AllUsers from './AllUsers.js';
import {Session} from 'meteor/session';

export default class ViewChartContent extends Component{
   constructor(){
      super();

      this.state = {
         partners: [],
         selectNumber: 1,
      }

      this.handleSelect = this.handleSelect.bind(this);
   }

   handleClick(){
      console.log("");
   }

   handleSelect(e){
      let s_Number = parseInt(e.currentTarget.name);
      this.setState({selectNumber: s_Number});
   }

   quickBloxConnect(){
      // Meteor.call("quickBlox.login", function(err, res){
      //    console.log(res);
      // })
   }
   componentWillMount(){
      this.quickBloxConnect();
   }

   renderContent(){
      let content;
         switch (this.state.selectNumber){
            case 1:
               content = <ChartDashboard />;
               break;
            case 2:
               content = <ReportedUsers/>;
               break;
            case 3:
               content = <ReportedConversations />;
               break;
            case 4:
               content = <ReportedComments />;
               break;
            case 5:
               content = <UnverifiedUsers />;
               break;
            case 6:
               content = <AllUsers />;
               break;
            default:
               break;
         }
      return content;
   }

   render(){
      return(
            <div className="">
               <SideBar onClick={this.props.onBack.bind(this)} onSelect={this.handleSelect}/>
               
               <div className="viewMainContent">
                  <div className="viewMain">
                     {this.renderContent()}
                  </div>
               </div>
            </div>
         )
   }
}

ViewChartContent.propTypes = {
   onBack: PropTypes.func.isRequired,
}