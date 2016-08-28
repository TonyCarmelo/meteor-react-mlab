import React, {Component, PropTypes} from 'react';

export default class ListComponent extends Component{
   constructor(props){
      super(props);
   }

   render(){
      return(
         <div className="listComponent">
            <a href="javascript:void(0)" onClick={this.props.onClick.bind(this)} name={JSON.stringify(this.props.partner)}>
               {this.props.showMinus ?
                  <div className="minusShowClass">
                     <img src='/minusbutton.png'/>
                  </div>
               :''}
               <div className="thumbnailTextClass">
                  <tt>{this.props.imgText}</tt>

                  <img src='/blank partner.png' width={this.props.size} height={this.props.size} />
               </div>
               <div className="adminPartnerLeteral">
                  {this.props.text}
               </div>
               {this.props.existing?
                  <sub className="auxiliaryText">
                    Partner Since  {this.props.auxText}
                  </sub>: ''
                  }
            </a>
        </div>
         );
   }
}


ListComponent.propTypes={
   imgText: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
   size: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired,
   existing: PropTypes.bool.isRequired,
   showMinus: PropTypes.bool,
   partner: PropTypes.object,
}