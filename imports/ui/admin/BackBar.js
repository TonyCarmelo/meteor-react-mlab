import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';

export default class BackBar extends Component{
   constructor(){
      super();
   }

   render(){
      return(
            <div className="backRedBar">
               <a href="#" onClick={this.props.onClick.bind(this)}>
                  <img src="/backarrow.png" />
               </a>
            </div>
         );
   }
}

BackBar.propTypes = {
   onClick: PropTypes.func.isRequired,
}