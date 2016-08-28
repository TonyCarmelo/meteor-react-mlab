import React, {Component, PropTypes} from 'react';
import {Table, Tr, Td, Thead, Th, Tbody} from 'reactable';

import { Commnts } from '../../api/commnts.js';
import { Meteor } from 'meteor/meteor';


export default class ReportedComments extends Component{
   constructor(){
      super();

      this.state = {
         data: [],
      };
   }

   getComments(){
      let instance = this;

      Meteor.call('users.getAll', function(err, users){
         if(err) return console.log(err);

         Meteor.call('commnts.getAllCommnts', function(err, comments){
            if(err) return console.log(err);
            
            let data = comments.map(function(comment){
               console.log(comment.commentUserId);
               let user = users.filter(function(u){
                  return u._id == comment.commentUserId;
               });
               console.log(user)
               return {
                  date: comment._created_at,
                  fromemail: comment.commentOwner,
                  fromname: user[0].fullName,
                  toemail: comment.Username,
                  toname: comment.Name,
                  type: comment.type,
                  comment: comment.commentText
               }
            })
            instance.setState({data: data});
         })
      })      
   }

   componentWillMount(){      
      this.getComments();
   }

   render(){
      return(
            <div className="chartDashboardMain">
                  <div className="chartDashboardTitle">
                     <p><img src="/reported comments dashboard title.png" /> Reported Comments </p>
                  </div>

                  <div className="reportedTable">
                      <Table className="table" id="table" noDataText="No matching records found" itemsPerPage={25} currentPage={0}>
                          <Thead>
                            <Th column="date">Date</Th>
                            <Th column="fromname">Reported Name</Th>
                            <Th column="fromemail">Reported Email</Th>
                            <Th column="toname">Reporter Name</Th>
                            <Th column="toemail">Reporter Email</Th>
                            <Th column="comment">Comment</Th>
                            <Th column="type">Type</Th>                            
                          </Thead>
                          
                           {this.state.data.map(function(d){
                              return (
                                 <Tr>
                                    <Td column="date">{d.date}</Td>
                                    <Td column="fromname">{d.fromname}</Td>
                                    <Td column="fromemail">{d.fromemail}</Td>
                                    <Td column="toname">{d.toname}</Td>
                                    <Td column="toemail">{d.toemail}</Td>
                                    <Td column="comment">{d.comment}</Td>
                                    <Td column="type"><label className="markType">{d.type}</label></Td>
                                 </Tr>
                              )
                           })}
                          
                      </Table>
                  </div>
            </div>   
         );
   }
}


