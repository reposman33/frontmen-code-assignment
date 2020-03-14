import React from "react";
import "./joke.scss";

class Joke extends React.Component {
	render() {
		return <div className='card'>{this.props.joke}</div>;
	}
}

export { Joke };
