import React from "react";
import { API } from "../services/API";
import { Joke } from "./joke";
import "./jokes.scss";

export class Jokes extends React.Component {
	constructor(props) {
		super(props);
		const savedJokes = localStorage.getItem("jokes");
		const savedFavoriteJokes = localStorage.getItem("favoriteJokes");
		this.initialState = {
			jokes: savedJokes ? JSON.parse(savedJokes) : [],
			favoriteJokes: savedFavoriteJokes ? JSON.parse(savedFavoriteJokes) : []
		};
		this.state = this.initialState;
		this.api = new API();
	}

	componentDidMount() {}

	onToggleFavorite = jokeId => {
		const favorites = this.state.favoriteJokes.includes(jokeId)
			? this.state.favoriteJokes.filter(id => id !== jokeId)
			: [...this.state.favoriteJokes, jokeId];
		this.setState({ favoriteJokes: favorites });
	};

	// "We can also turn a timer on/off via a button (every 5 seconds). This will add one random joke to the
	// favourites list http://api.icndb.com/jokes/random/1 until the list has 10 items.""
	// vertaling: Via een knop kan elke 5 seconden een favoriete grap geselecteerd worden tot een maximum van 10.
	selectRandomFavorite = () => {
		// create 10 random favorite jokes;
		const randomJokes = [];
		const jokes = this.state.jokes.slice();
		for (let i = 0; i < 10; i++) {
			let randomIndex = Math.floor(Math.random() * (jokes.length - 1));
			randomJokes.push(jokes[randomIndex].id);
			jokes.splice(randomIndex, 1);
		}
		// update the state every 5 secs with a favorite joke
		const id = setInterval(() => {
			this.setState({
				favoriteJokes: [...this.state.favoriteJokes, randomJokes[0]]
			});
			randomJokes.splice(0, 1);
			if (randomJokes.length === 0) {
				clearInterval(id);
			}
		}, 5000);
		// add these to the state
	};

	onGetJokes = () => {
		this.getJokes();
	};

	onSave = () => {
		this.state.jokes.length && localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
		this.state.favoriteJokes.length &&
			localStorage.setItem("favoriteJokes", JSON.stringify(this.state.favoriteJokes));
	};

	async getJokes() {
		const jokes = await this.api.getRandomJokes(20);
		this.setState({ jokes: jokes.map(joke => ({ id: joke.id, joke: joke.joke })) });
	}

	render() {
		return (
			<div className='container'>
				{this.state.jokes.map(joke => (
					<Joke
						id={joke.id}
						key={joke.id}
						joke={joke.joke}
						favorite={this.state.favoriteJokes.includes(joke.id)}
						onClick={this.onToggleFavorite}></Joke>
				))}
				<h1>Click your favourite Chuck Norris Joke</h1>
				<button onClick={this.onGetJokes}>More Jokes!</button>
				<button onClick={this.onSave}>Save</button>
				<button onClick={this.selectRandomFavorite}>Choose random</button>
			</div>
		);
	}
}
