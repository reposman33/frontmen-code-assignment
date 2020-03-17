import React from "react";
import { API } from "../services/API";
import { Joke } from "./joke";
import { Modal } from "./modal";
import "./jokes.scss";

export class Jokes extends React.Component {
	constructor(props) {
		super(props);
		// retrieve jokes from localStorage
		const savedJokes = localStorage.getItem("jokes");
		// retrieve favouriteJokes from localStorage
		const savedfavouriteJokes = localStorage.getItem("favouriteJokes");
		// initilize initial state
		this.initialState = {
			jokes: savedJokes ? JSON.parse(savedJokes) : [],
			favouriteJokes: savedfavouriteJokes ? JSON.parse(savedfavouriteJokes) : [],
			feedback: "",
			showModal: false
		};
		this.state = this.initialState;

		this.api = new API();
		// retrieve jokes from API if none present
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}
	}

	componentDidMount() {}

	onTogglefavourite = jokeId => {
		const favourites = this.state.favouriteJokes.includes(jokeId)
			? this.state.favouriteJokes.filter(id => id !== jokeId)
			: [...this.state.favouriteJokes, jokeId];
		this.setState({ favouriteJokes: favourites });
	};

	// "We can also turn a timer on/off via a button (every 5 seconds). This will add one random joke to the
	// favourites list http://api.icndb.com/jokes/random/1 until the list has 10 items.""
	// vertaling: Via een knop kan elke 5 seconden een favoriete grap geselecteerd worden tot een maximum van 10.
	selectRandomfavourite = () => {
		const RANDOM_JOKES_COUNT = 10;
		const randomJokes = [];
		// create 10 random favourite jokes that are not already favourites...
		const jokesToChooseFrom = this.state.jokes.filter(joke => !this.state.favouriteJokes.includes(joke.id));
		// are there enough jokes to randomly selectfrom?
		const slack = jokesToChooseFrom.length - RANDOM_JOKES_COUNT;

		// you cannot select 10 random items from a list containng 10 or less items
		if (slack <= 0) {
			alert(`Can not choose ${RANDOM_JOKES_COUNT} random jokes from a total of ${jokesToChooseFrom.length}`);
			return;
		}
		// show user how many remaining jokes are selected
		this.setState({ feedback: `Selecting 10 random jokes from a total of ${jokesToChooseFrom.length}` });
		for (let i = 0; i < RANDOM_JOKES_COUNT; i++) {
			// select a random joke
			let randomIndex = Math.floor(Math.random() * jokesToChooseFrom.length);
			randomJokes.push(jokesToChooseFrom[randomIndex].id);
			// remove selected joke from source array - we don't want to select it again
			jokesToChooseFrom.splice(randomIndex, 1);
		}
		// update the state every 5 secs with a favourite joke
		const id = setInterval(() => {
			// use functional setState or this will not work...
			this.setState(() => ({
				favouriteJokes: [...this.state.favouriteJokes, randomJokes[0]]
			}));
			// remove random favourite joke when displayed as selected
			randomJokes.splice(0, 1);
			// stop showing random favourite jokes when there are no more
			if (randomJokes.length <= 0) {
				// remove feedback message
				this.setState({ feedback: "" });
				clearInterval(id);
			}
		}, 5000);
	};

	onSave = () => {
		// if there are jokes, save in localStorage
		this.state.jokes.length && localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
		// if there are favouriteJokes, save in localStorage
		this.state.favouriteJokes.length &&
			localStorage.setItem("favouriteJokes", JSON.stringify(this.state.favouriteJokes));
	};

	getJokes = async () => {
		const jokes = await this.api.getRandomJokes(20);
		this.setState({ jokes: jokes.map(joke => ({ id: joke.id, joke: joke.joke })), favouriteJokes: [] });
	};

	// callback for modal component
	setModalState = state => {
		this.setState({ showModal: state });
	};

	render() {
		return (
			<React.Fragment>
				<div className='header'>
					<h1>Click to select your favourite Chuck Norris joke</h1>
					<span
						className='button'
						onClick={() => this.setState({ showModal: true })}
						role='img'
						aria-label='about'>
						&#x2754;
					</span>
				</div>
				<div className='container'>
					{this.state.jokes.map(joke => (
						<Joke
							id={joke.id}
							key={joke.id}
							joke={joke.joke}
							favourite={this.state.favouriteJokes.includes(joke.id)}
							onClick={this.onTogglefavourite}></Joke>
					))}
				</div>
				<div className='footer'>
					<h3>{this.state.feedback.length ? this.state.feedback : null}</h3>
					<button onClick={this.getJokes}>Update jokes</button>
					<button onClick={this.onSave}>Save jokes</button>
					<button onClick={this.selectRandomfavourite}>Choose 10 random jokes</button>
				</div>

				<Modal showModal={this.state.showModal} setModalState={this.setModalState} />
			</React.Fragment>
		);
	}
}
