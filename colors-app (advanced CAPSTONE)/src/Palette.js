import React, { Component } from 'react'

import './Palette.css'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'



class Palette extends Component {

    constructor(props) {
        super(props)
        this.state = { level: 500, format: 'hex' }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel })
    }

    changeFormat(val) {
        this.setState({ format: val })
    }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => <ColorBox background={color[format]} name={color.name} key={color.id} moreUrl={`/palette/${id}/${color.id}`} showingFullPalette={true} />)
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors={true} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }

}

export default Palette