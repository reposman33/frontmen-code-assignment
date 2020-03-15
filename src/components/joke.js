import React from "react";
import "./joke.scss";
import * as he from "he";

class Joke extends React.Component {
	onSetfavourite = () => {
		this.props.onClick(this.props.id);
	};

	render() {
		this.classNames = this.props.favourite ? "card selected" : "card";
		return (
			<div className={this.classNames} data-id={this.props.id} onClick={this.onSetfavourite}>
				{he.unescape(this.props.joke)}
			</div>
		);
	}
}

export { Joke };
