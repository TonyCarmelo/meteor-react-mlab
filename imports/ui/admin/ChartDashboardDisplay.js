import React, {Component, PropTypes} from 'react';
import {LineChart} from 'react-d3';
import {RaisedButton} from 'material-ui';
import {Meteor} from 'meteor/meteor';
import {Users} from '../../api/users.js';
import {Group} from 'react-button-group';

export default class ChartDashboardDisplay extends Component{

	constructor(props){
		super(props)
		this.state = {
			lineData: [{
				values: [ { x: 0, y: 0 } ],
				strokeWidth: "3"
			}],
			primaryData: [ { x: 0, y: 0 }],
			date_number: 7,
			interval: 1,
			tickcount: 2,
		}

		this.handleChanged = this.handleChanged.bind(this);
	}

	colorsfunc(){
		return "rgb(225, 114, 89)";
	}


	getChartUserInfo(date){
		let instance = this;

		Meteor.call('users.getLast7daysUser', date, function(err, res){
			if (err) return console.log(err)
			instance.setState({lineData: [{
						values: res,
						strokeWidth: "3",
					},
					]
				});
			var value = Math.max.apply(Math,res.map(function(o){return o.y;}))
			instance.setState({tickcount: value});
		});
	}


	xformatter(d){
		var date = new Date(d);
		return date.toString();
	}

	handleChanged(e){
		var value = e.currentTarget.value / 7;
		value = value.toFixed();
		var date = e.currentTarget.value;
		this.getChartUserInfo(parseInt(date));
		let instance = this;
		setTimeout(function(){instance.setState({interval: value})}, 200);
	}

	componentWillMount(){
		this.getChartUserInfo(7);
	}

	render(){
		return(
				<div className="lineChart">
					<div className="lineChartComponent">
						<LineChart
						  legend={false}
						  data={this.state.lineData}
						  width='100%'
						  height='100%'
						  viewBoxObject={this.props.config}
						  yAxisLabel=""
						  xAxisLabel=""
						  colors={this.colorsfunc}
						  axesColor="rgb(225, 114, 89)"
						  gridVerticalStrokeWidth={3}
						  gridHorizontal={false}
						  yAxisStrokeWidth={5}
						  xAxisStrokeWidth={5}
						  yAxisTickCount={this.state.tickcount}
						  xAxisTickInterval={{ unit: 'day', interval: this.state.interval }}
						/>
					</div>
				</div>
			)
	}
}

ChartDashboardDisplay.propTypes = {
	config: PropTypes.object.isRequired,
	_partner: PropTypes.string.isRequired,
}