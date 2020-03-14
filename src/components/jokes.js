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

	onSetFavorite = jokeId => {
		const favorites = this.state.favoriteJokes.includes(jokeId)
			? this.state.favoriteJokes
			: [...this.state.favoriteJokes, jokeId];
		this.setState({ favoriteJokes: favorites });
	};

	onGetJokes = () => {
		this.getJokes();
	};

	onSave = () => {
		this.state.jokes.length && localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
		this.state.favoriteJokes.length &&
			localStorage.setItem("favoriteJokes", JSON.stringify(this.state.favoritejokes));
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
						onClick={this.onSetFavorite}></Joke>
				))}
				<button onClick={this.onGetJokes}>More Jokes!</button>
				<button onClick={this.onSave}>Save</button>
			</div>
		);
	}
}
