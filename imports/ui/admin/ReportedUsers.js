import React, {Component, PropTypes} from 'react';
import {Table, Tr, Td, Thead, Th} from 'reactable';

export default class ReportedUsers extends Component{
   constructor(){
      super();

      this.state = {
         data: []
      }
   }

   getUsers(){
      let instance = this;

      Meteor.call('users.getAll', function(err, users){
         if(err) return console.log(err);

         Meteor.call('reported.getAllUsers', function(err, reporteds){
            if(err) return console.log(err);
            
            let data = reporteds.map(function(reported){

               let fromuser = users.find((u)=> u._id == reported._p_fromUser.split('$').pop());
               let touser = users.find((u)=> u._id == reported._p_toUser.split('$').pop());

               fromuser = fromuser ? fromuser : {email: '', fullName: ''};
               touser = touser ? touser : {email: '', fullName: ''};

               return {
                  date: reported._created_at,
                  fromemail: fromuser.email,
                  fromname: fromuser.fullName,
                  toemail: touser.email,
                  toname: touser.fullName,
                  type: reported.type,
               }
            })
            instance.setState({data: data});
         })
      })      
   }

   componentWillMount(){      
      this.getUsers();
   }

   render(){
      return(
            <div className="chartDashboardMain">
                  <div className="chartDashboardTitle">
                     <p><img src="/reported users dashboard title.png" /> Reported Users </p>
                  </div>

                  <div className="reportedTable">
                      <Table className="table" id="table" noDataText="No matching records found" itemsPerPage={25} currentPage={0}>
                          <Thead>
                            <Th column="date">Date</Th>
                            <Th column="fromemail">Reported Email</Th>
                            <Th column="fromname">Reported Name</Th>
                            <Th column="toemail">Reporter Email</Th>
                            <Th column="toname">Reporter Name</Th>
                            <Th column="type">Type</Th>                            
                          </Thead>
                           {this.state.data.map(function(d){
                              return (
                                 <Tr>
                                    <Td column="date">{d.date}</Td>
                                    <Td column="fromemail">{d.fromemail}</Td>
                                    <Td column="fromname">{d.fromname}</Td>
                                    <Td column="toemail">{d.toemail}</Td>
                                    <Td column="toname">{d.toname}</Td>
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
