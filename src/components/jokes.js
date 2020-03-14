import React from "react";
import { API } from "../services/API";
import { Joke } from "./joke";

export class Jokes extends React.Component {
	initialState = { jokes: [] };

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.jokes = [];
		this.api = new API();
		this.getJokes();
	}

	async getJokes() {
		const jokes = await this.api.getRandomJokes(20);
		this.setState({ jokes: jokes.map(joke => ({ id: joke.id, joke: joke.joke })) });
	}

	render() {
		return this.state.jokes.map(joke => <Joke id={joke.id} joke={joke.joke}></Joke>);
	}
}
