import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import ListComponent from './ListComponent.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


export default class RemoveList extends Component{
   constructor(){
      super();
      this.state = {
         open: false,
         id: "",
         text: '',
      }

      this.handleClose = this.handleClose.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
   }

   handleClick(e){
      var _obj = JSON.parse(e.currentTarget.name);
      this.setState({id: _obj._id});
      this.setState({text: _obj.partner});
      this.setState({open: true});
   }

   handleDelete(){
      Meteor.call('partners.remove', this.state.id);
      this.props.onSelect(this.state.id);
      this.setState({open: false});
   }

   handleClose(){
      this.setState({open: false});
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
         const actions = [
            <RaisedButton
              label="YES"
              className="createButtonClass removeButton"
              keyboardFocused={true}
              onClick={this.handleDelete}
            />,
            <RaisedButton
              label="NEVERMIND"
              className="cancelButtonClass removeButton"
              backgroundColor="rgb(225,114,89)"
              labelColor="white"
              onClick={this.handleClose}
            />,

          ];
      return(
            <div className="currentListContainer">
               { this.props.partners.map(function(partner, index){
                  return <ListComponent imgText={instance.getImageText(partner.city)} size={150} text={partner.partner} existing={false} showMinus={true} onClick={instance.handleClick.bind(instance)} partner={partner} key={index} />
               })}

               <Dialog
                title="Wait!"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                className="removeDialog"
                contentClassName="removeDialogContent"
                titleClassName="removeDialogTitle"
                overlayClassName="removeDialogOverlay"
                bodyClassName="removeDialogBody"
                actionsContainerClassName="removeDialogAction"
              >
                Are you sure you want to remove {this.state.text} as a partner?
              </Dialog>
            </div>
         );
   }
}

RemoveList.propTypes = {
   onSelect: PropTypes.func.isRequired,
   partners: PropTypes.array.isRequired,
}