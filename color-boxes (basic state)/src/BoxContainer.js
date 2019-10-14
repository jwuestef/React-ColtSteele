import React, { Component } from 'react'

import './BoxContainer.css'
import Box from './Box';

export default class BoxContainer extends Component {

    static defaultProps = {
        numBoxes: 18,
        allColors: ['purple', 'magenta', 'pink', 'violet']
    }

    render() {
        const boxes = Array.from({ length: this.props.numBoxes }).map( () => <Box colors={this.props.allColors} /> )
        return (
            <div className="BoxContainer">
                {boxes}
            </div>
        )
    }

}
