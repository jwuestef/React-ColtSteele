import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './App.css';
import seedColors from './seedColors';
import Palette from './Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';



class App extends React.Component {

    constructor(props) {
        super(props)
        const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
        this.state = {
            palettes: savedPalettes || seedColors
        }
        this.findPalette = this.findPalette.bind(this)
        this.savePalette = this.savePalette.bind(this)
        this.syncLocalStorage = this.syncLocalStorage.bind(this)
        this.deletePalette = this.deletePalette.bind(this)
    }

    findPalette(id) {
        return this.state.palettes.find(function(palette) {
            return palette.id === id
        })
    }

    savePalette(newPalette) {
        this.setState({ palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)        
    }

    syncLocalStorage() {
        window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    }

    deletePalette(id) {
        this.setState( (prevState) => {
            return {
                palettes: prevState.palettes.filter( p => p.id !== id )
            }
        }, this.syncLocalStorage)
    }

    // Wrapping switch in an always-rendered route lets us add a transition animation. Must add location={location} to Switch now
    render() {
        return (
            <Route render={ ({location}) => (
                <TransitionGroup> 
                    <CSSTransition classNames='page' timeout={500} key={location.key}>
                        <Switch location={location}>
                            <Route exact path="/" render={(routeProps) => <Page><PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} /></Page>} />   {/* ...routeProps needed so we can use history object inside this component's hierarchy */}
                            <Route exact path="/palette/new" render={(routeProps) => <Page><NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} /></Page>} />   {/* ...routeProps needed so we can use history object inside this component's hierarchy */}
                            <Route exact path="/palette/:id" render={(routeProps) => <Page><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /></Page> } />
                            <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <Page><SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} /></Page> } />
                            <Route render={(routeProps) => <Page><PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} /></Page>} />
                        </Switch>
                    </CSSTransition>                   
                </TransitionGroup>
            )} />
        );
    }

}



export default App;
