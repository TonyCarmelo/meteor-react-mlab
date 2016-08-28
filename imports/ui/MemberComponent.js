import React, {Component, PropTypes} from 'react';

export default class MemberComponent extends Component{
	constructor(){
		super();

	}

	getStatistics(){
		var statis = this.props.data.statistics;

		if (statis.length > 3){
			statis = this.props.data.statistics.charAt(0) + "." + this.props.data.statistics.charAt(1) + "k"
			return statis
		}
		return statis
	}

	render(){
		return(
				<div className="memberComponent">
					<div className="componentTitle">
						{this.props.data.title}
					</div>
					<div className="componentBody">
						<div className="statistics">
							{this.getStatistics()}
						</div>

						<div className="componentImage">
							<img src={this.props.data.imageName} width="50" height="40" />
						</div>
					</div>
				</div>
			);
	}
}

MemberComponent.propTypes = {
	data: PropTypes.object.isRequired,
}