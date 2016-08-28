import React, {
    Component, PropTypes
}
from 'react';
import PartnerComponent from './PartnerComponent.js';

export
default class ViewChartComponent extends Component {
    constructor() {
        super()
    }

    
    render() {
        return ( <PartnerComponent onClick = {
                this.props.onClick.bind(this)
            }
            size = {
                200
            }
            text = "Dashboard"
            link = "javascript:void(0)"
            imgSrc = "/usage.png" / >
        );
    }
}


ViewChartComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
}