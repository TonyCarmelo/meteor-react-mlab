import React, {Component, PropTypes} from 'react';

export default class CustomeRow1 extends Component{
   constructor(){
      super();
   }

   render(){
      return(<tr>
                <td>{this.props.date}</td>
                <td>{this.props.fromemail}</td>
                <td>{this.props.fromname}</td>
                <td>{this.props.toemail}</td>
                <td>{this.props.toname}</td>
                <td className="markType">{this.props.type}</td>
            </tr>
         );
   }
}

CustomeRow1.propTypes = {
   date : PropTypes.string.isRequired,
   fromemail: PropTypes.string.isRequired,
   fromname: PropTypes.string.isRequired,
   toemail: PropTypes.string.isRequired,
   toname: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
}