import React, {Component, PropTypes} from 'react';

export default class PartnerComponent extends Component{
   constructor(props){
      super(props);
   }

   render(){
      return(
            <a href={this.props.link} onClick={this.props.onClick.bind(this)}>
               <img src={this.props.imgSrc} width={this.props.size} height={this.props.size} />
               <div className="adminPartnerLeteral">
                  {this.props.text}
               </div>
            </a>
         );
   }
}


PartnerComponent.propTypes={
   imgSrc: PropTypes.string.isRequired,
   link: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
   size: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired,
}