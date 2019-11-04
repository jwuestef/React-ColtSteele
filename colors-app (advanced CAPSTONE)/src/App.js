import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import seedColors from './seedColors';
import Palette from './Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';



class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            palettes: seedColors
        }
        this.findPalette = this.findPalette.bind(this)
        this.savePalette = this.savePalette.bind(this)
    }

    findPalette(id) {
        return this.state.palettes.find(function(palette) {
            return palette.id === id
        })
    }

    savePalette(newPalette) {
        this.setState({ palettes: [...this.state.palettes, newPalette]})
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />} />   {/* ...routeProps needed so we can use history object inside this component's hierarchy */}
                <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} />   {/* ...routeProps needed so we can use history object inside this component's hierarchy */}
                <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /> } />
                <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} /> } />
            </Switch>
        );
    }

}



export default App;
