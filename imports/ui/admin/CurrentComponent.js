import React, {Component, PropTypes} from 'react';
import PartnerComponent from './PartnerComponent.js';

export default class CurrentComponent extends Component{
   constructor(){
      super()
   }

   render(){
      return(
            <PartnerComponent
               onClick={this.props.onClick.bind(this)}
               size={200}
               text="Current Partners"
               link="#"
               imgSrc="/Current Partners.png" />
         )
   }
}

CurrentComponent.propTypes = {
   onClick: PropTypes.func.isRequired,
}