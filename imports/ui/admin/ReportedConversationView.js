'use strict';

import React, {Component, PropTypes} from 'react';

export default class ReportedConversationView extends Component {
	constructor(){
      super();
      this.state = {
      	content: "",
      }
   }

   getChatContent(){
   		let instance = this;
   		Meteor.call('quickblox.getContent',this.props.object.view,  function(err, res){
   			console.log(res);
   		})
   }
   render(){
   		return(
   				<div>
   					<div className="ConversationDetailBack">
   						<a onClick={this.props.onBack.bind(this)} href="">
   							 Back
   							<img src="/back.png"/>
   						</a>
   					</div>

   					<div className="panel ConversationDetailView">
   						<div className="ConversationDetailViewTitle">
   							<ul>
   								<li>{this.props.object.date}</li>
   								<li>{this.props.object.name}</li>
   								<li>{this.props.object.email}</li>
   								<li>{this.props.object.reported}</li>
   								<li><label className="markType">{this.props.object.type}</label></li>
   								<li><label className="markType">{this.props.object.convtype}</label></li>
   							</ul>
   						</div>
   						<div className="ConversationView">
   							Conversation
   						</div>
   					</div>
   				</div>
   			)
   }
}


ReportedConversationView.propTypes = {
	object: PropTypes.object.isRequired,
	onBack: PropTypes.func.isRequired
}