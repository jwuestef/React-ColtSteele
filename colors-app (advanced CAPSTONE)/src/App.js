import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import seedColors from './seedColors';
import Palette from './Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';



class App extends React.Component {

    findPalette(id) {
        return seedColors.find(function(palette) {
            return palette.id === id
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />} />   {/* ...routeProps needed so we can use history object inside this component's hierarchy */}
                <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /> } />
                <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} /> } />
            </Switch>
        );
    }

}



export default App;
