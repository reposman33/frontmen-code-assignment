import React from "react";
import "./joke.scss";

class Joke extends React.Component {
	onSetFavorite = () => {
		this.props.onClick(this.props.id);
	};

	render() {
		this.classNames = this.props.favorite ? "card selected" : "card";
		return (
			<div className={this.classNames} data-id={this.props.id} onClick={this.onSetFavorite}>
				{this.props.joke}
			</div>
		);
	}
}

export { Joke };
