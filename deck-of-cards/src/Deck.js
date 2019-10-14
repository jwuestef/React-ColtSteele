import React, { Component } from 'react'
import Axios from 'axios'
import Card from './Card'
import './Deck.css'

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck'


class Deck extends Component {

    constructor(props) {
        super(props)        
        this.state = { deck: null, drawn: [] }
        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount() {
        let deck = await Axios.get(`${API_BASE_URL}/new/shuffle/`)
        this.setState({ deck: deck.data })
    }

    async getCard() {
        try {
            let cardRes = await Axios.get(`${API_BASE_URL}/${this.state.deck.deck_id}/draw/`)
            if (!cardRes.data.success)
                throw new Error("No cards remaining")
            let card = cardRes.data.cards[0]
            this.setState(prevState => ({
                drawn: [
                    ...prevState.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch(ex) {
            alert(ex);
        }
    }

    render() {
        const cards = this.state.drawn.map(c => (
            <Card name={c.name} image={c.image} key={c.id} />
        ))
        return (
            <div>
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">A little demo made with React</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card</button>
                <div className="Deck-cardarea">                    
                    {cards}                
                </div>
            </div>
        )
    }

}

export default Deck