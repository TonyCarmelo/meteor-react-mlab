import React, {Component, PropTypes} from 'react';
import MemberComponent from '../MemberComponent';


export default class ChartDashboardMemberShip extends Component{
	constructor(){
		super();
		this.handleRefresh = this.handleRefresh.bind(this);
	}


	handleRefresh(){
		this.props.parent.componentWillMount();
		// this.forceUpdate()
	}

	render(){
		return(
				<div className="member">
					<div className="memberContainer">
						<div className="students">
							<MemberComponent data={this.props.registered} />
						</div>

						<div className="drives">
							<MemberComponent data={this.props.unverified} />
						</div>

						<div className="rides">
							<MemberComponent data={this.props.last} />
						</div>
					</div>
				</div>
			);
	}
}

ChartDashboardMemberShip.propTypes = {
	registered: PropTypes.object.isRequired,
	unverified: PropTypes.object.isRequired,
	last: PropTypes.object.isRequired,
	parent: PropTypes.object.isRequired,
}