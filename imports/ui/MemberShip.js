import React, {Component, PropTypes} from 'react';
import MemberComponent from './MemberComponent';


export default class MemberShip extends Component{
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

					<div className="refreshButton">
						<a className="refreshBox"  href="#" onClick={this.handleRefresh}>
						<span className="refreshTitle">
							Refresh
							<img src="/refresh icon.png" width="15" height="15" />
						</span>
						</a>
					</div>
					<div className="memberContainer">
						<div className="students">
							<MemberComponent data={this.props.students} />
						</div>

						<div className="drives">
							<MemberComponent data={this.props.drives} />
						</div>

						<div className="rides">
							<MemberComponent data={this.props.rides} />
						</div>
					</div>
				</div>
			);
	}
}

MemberShip.propTypes = {
	students: PropTypes.object.isRequired,
	drives: PropTypes.object.isRequired,
	rides: PropTypes.object.isRequired,
	parent: PropTypes.object.isRequired,
}