import React, {Component, PropTypes} from 'react';
import PartnerComponent from './PartnerComponent.js';

export default class AddNewComponent extends Component{
   constructor(){
      super()
   }

   render(){
      return(<PartnerComponent
               onClick={this.props.onClick.bind(this)}
               size={200}
               text="Add New Partner"
               link="javascript:void(0)"
               imgSrc="/addnewpartner.png" />
         );
   }
}


AddNewComponent.propTypes = {
   onClick : PropTypes.func.isRequired,
}