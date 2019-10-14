import React, { Component } from 'react'
import Axios from 'axios'
import uuid from 'uuid/v4'

import './JokeList.css'
import Joke from './Joke'



export default class JokeList extends Component {

    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props)
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.text))        
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes()
        }
    }

    async getJokes() {
        try {        
            let jokes = []
            while (jokes.length < this.props.numJokesToGet) {
                let res = await Axios.get('https://icanhazdadjoke.com', {
                    headers: { accept: 'application/json'}
                })
                let newJoke = res.data.joke
                if (!this.seenJokes.has(newJoke))
                    jokes.push({id: uuid(), text: res.data.joke, votes: 0})
                else {                
                    console.log('Found a duplicate:')
                    console.log(newJoke)
                }
            }
                
            this.setState(prevState => {
                return {
                    jokes: [...prevState.jokes, ...jokes],
                    loading: false
                }
            }, () => {
                window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            })
        } catch (e) {
            alert(e)
            this.setState({loading: false})
        }
    }

    handleVote(id, delta) {
        this.setState( prevState => {
            return {
                jokes: prevState.jokes.map(j => {
                    return j.id === id ? {...j, votes: j.votes + delta} : j
                })
            }
        }, () => {
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        })
    }

    handleClick() {
        this.setState({ loading: true }, this.getJokes)
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin"></i>
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort( (a,b) => b.votes - a.votes)
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="Logo"/>
                    <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(j => (
                        <Joke key={j.id} text={j.text} votes={j.votes} upvote={() => this.handleVote(j.id, 1)} downvote={() => this.handleVote(j.id, -1)} />
                    ))}
                </div>
            </div>
        )
    }
}
