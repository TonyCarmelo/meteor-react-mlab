import React, {Component, PropTypes} from 'react';
import PartnerComponent from './PartnerComponent.js';

export default class RemoveComponent extends Component{
   constructor(){
      super()
   }

   render(){
      return(
            <PartnerComponent
               onClick={this.props.onClick.bind(this)}
               size={200}
               text="Remove Partners"
               link="#"
               imgSrc="/remove partners.png" />
         )
   }
}


RemoveComponent.propTypes = {
   onClick : PropTypes.func.isRequired,
}