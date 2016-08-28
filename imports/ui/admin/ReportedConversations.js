import React, {Component, PropTypes} from 'react';
import ReportedConversationView from './ReportedConversationView';
import {Table, Tr, Td, Thead, Th} from 'reactable';

export default class ReportedConversations extends Component{
   constructor(){
      super();

      this.state = {
         data: [],
         detailShow: false,
         object: {},
      }

      this.handleClick = this.handleClick.bind(this);
   }

   getConversations(){
      let instance = this;

      Meteor.call('conversations.getAllConv', function(err, convs){
         if(err) return console.log(err);
         
         let data = convs.map(function(conv){

            return {
               date: conv._created_at,
               name: conv.Name,
               email: conv.Username,
               reported: conv.reportedUserId,
               type: conv.type,
               convtype: conv.conversationType,
               view: conv.identifier,
            }
         })
         instance.setState({data: data});
      })
   }

   componentWillMount(){      
      this.getConversations();
   }


   handleClick(e){
      let data = JSON.parse(e.target.name);
      this.setState({object: data, detailShow: true});

      console.log(e.target.name);
   }

   handleBack(){
      this.setState({detailShow: false});
   }

   renderTable(){
      let instance = this;
      return(
         <div>
            <div className="chartDashboardTitle">
               <p><img src="/chat icon for dashboard title.png" /> Reported Conversations </p>
            </div>
            <div className="reportedTable">
                <Table className="table" id="table" noDataText="No matching records found" itemsPerPage={25} currentPage={0}>
                    <Thead>
                      <Th column="date">Date</Th>
                      <Th column="name">Name</Th>
                      <Th column="email">Email</Th>
                      <Th column="reported">Reported</Th>
                      <Th column="type">Type</Th>
                      <Th column="convtype">Conversation Type</Th>                            
                      <Th column="view"> </Th>
                    </Thead>
                     {this.state.data.map(function(d){
                        return (
                           <Tr>
                              <Td column="date">{d.date}</Td>
                              <Td column="name">{d.name}</Td>
                              <Td column="email">{d.email}</Td>
                              <Td column="reported">{d.reported}</Td>
                              <Td column="type"><label className="markType">{d.type}</label></Td>
                              <Td column="convtype"><label className="markType">{d.convtype}</label></Td>
                              <Td column="view"><a href="" onClick={instance.handleClick} name={JSON.stringify(d)}>View</a></Td>
                           </Tr>
                        )
                     })}
                </Table>
            </div>
         </div>   
         );
   }

   renderDetail(){
      return(
         <div className="ConversationDetail">
            <ReportedConversationView object={this.state.object} onBack={this.handleBack.bind(this)}/>
         </div>
      );
   }

   render(){
      return(
            <div className="chartDashboardMain">
                  {this.state.detailShow ? 
                     this.renderDetail() :
                     this.renderTable()}                  
            </div>   
         );
   }
}
