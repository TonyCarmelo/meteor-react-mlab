import React, {
   Component, PropTypes
}
from 'react';
import BackBar from './BackBar.js';
import AddNewComponent from './AddNewComponent.js';
import AddNewFormContent from './AddNewFormContent.js';

export
default class AddNewContent extends Component {
   constructor() {
      super();
   }

   handleClick() {
      console.log("");
   }

   render() {
      return ( <div>
         < BackBar onClick = {
            this.props.onBack.bind(this)
         }
         />

               <div className           = "newClassUnderBar">
               <AddNewComponent onClick = {this.handleClick.bind(this)}/ >
         < /div>

               <div>
                  <AddNewFormContent onCancelClick={this.props.onBack.bind(this)}/ >
         < /div>
            </div>
      );
   }
}

AddNewContent.propTypes = {
   onBack: PropTypes.func.isRequired,
}