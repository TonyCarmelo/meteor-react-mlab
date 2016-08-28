import React, {Component, PropTypes} from 'react';
import {Table, Tr, Td, Thead, Th} from 'reactable';

export default class UnverifiedUsers extends Component{
   constructor(){
      super();

      this.state = {
         data: []
      }
   }

   getUnverifiedUsers(){
      let instance = this;

      Meteor.call('users.getUnverifiedUsers', function(err, res){
         if(err) return console.log(err);
         instance.setState({data: res});
      });
   }

   componentWillMount(){      
      this.getUnverifiedUsers();
   }

   render(){
      return(
            <div className="chartDashboardMain">
                  <div className="chartDashboardTitle">
                     <p><img src="/reported user dashboard title.png" /> Unverified Users </p>
                  </div>

                  <div className="reportedTable">
                      <Table className="table" id="table" noDataText="No matching records found" itemsPerPage={25} currentPage={0}>
                          <Thead>
                            <Th column="email">Email</Th>
                            <Th column="name">Name</Th>
                            <Th column="university">University</Th>
                            <Th column="createAt">Created At</Th>
                          </Thead>
                           {this.state.data.map(function(d){
                              return (
                                 <Tr>
                                    <Td column="email">{d.email}</Td>
                                    <Td column="name">{d.name}</Td>
                                    <Td column="university">{d.university}</Td>
                                    <Td column="createAt">{d.createAt}</Td>
                                 </Tr>
                              )
                           })}
                      </Table>
                  </div>
            </div>   
         );
   }
}
