import React, {Component, PropTypes} from 'react';
import ListComponent from './ListComponent.js';

export default class CurrentList extends Component{
   constructor(){
      super();

      this.getImageText = this.getImageText.bind(this);
   }

   handleClick(e){
      this.props.onSelect(e.currentTarget.name);
   }

   getImageText(cityString){
      var [first, second] = cityString.split(' ', 2);
      if((second == null) || (second == "")){
         return first.charAt(0).toUpperCase();
      }else{
         return first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase();
      }
   }

   render(){
      let instance = this;
      return(
            <div className="currentListContainer">
               { this.props.partners.map(function(partner, index){
                  return <ListComponent imgText={instance.getImageText(partner.city)} size={150} text={partner.partner} existing={false} showMinus={false} onClick={instance.handleClick.bind(instance)} partner={partner} key={index}/>
               })}
            </div>
         );
   }
}

CurrentList.propTypes = {
   onSelect: PropTypes.func.isRequired,
   partners: PropTypes.array.isRequired,
}