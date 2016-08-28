import React, {Component, PropTypes} from 'react';
import PartnerComponent from './PartnerComponent.js';

export default class SideBar extends Component{
   constructor(){
      super()
      this.handleSelect = this.handleSelect.bind(this);
   }

   handleSelect(e){
      this.props.onSelect(e);
   }

   render(){
      return(<div className="sideRedBar">
               <div id="sidebar">
                    <ul>
                        <li id="firstLi"><a href="#" onClick={this.props.onClick.bind(this)}><img src="/homearrow.png" />Home</a></li>
                        <div className="mainMenu">
                           <li><a href="javascript:void(0);" onClick={this.handleSelect} name="1"><img src="/dashboardiconmenu.png" />Dashboard</a></li>
                           <li><a href="javascript:void(0);" onClick={this.handleSelect} name="2"><img src="/reportedusersiconmenu.png" />Reported Users</a></li>
                           <li><a href="javascript:void(0);" onClick={this.handleSelect} name="3"><img src="/chaticonmenu.png" />Reported Conversations</a></li>
                           <li><a href="javascript:void(0);" onClick={this.handleSelect} name="4"><img src="/commenticonmenu.png" />Reported Comments</a></li>
                           <li><a href="javascript:void(0);" onClick={this.handleSelect} name="5"><img src="/unverifiedusericonmenu.png" />Unverified Users</a></li>
                           <li id="allUser"><a href="javascript:void(0);"onClick={this.handleSelect} name="6"><img src="/allusericonmenu.png" />All Users</a></li>
                        </div>
                    </ul>
                </div>
            </div>
         );
   }
}


SideBar.propTypes = {
   onClick : PropTypes.func.isRequired,
   onSelect: PropTypes.func.isRequired,
}