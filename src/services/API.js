export class API {
	URL = "http://api.icndb.com/jokes/";

	getAllJokes = async () => {
		return await fetch(this.URL)
			.then(res => res.json())
			.catch(err => err.msg);
	};

	getRandomJokes = async (amount = 10) => {
		const res = await fetch(`${this.URL}random/${amount}`);
		const json = await res.json();
		return json.value;
	};

	getJoke = async id => {
		if (!id) {
			alert("You must provide a joke id");
		} else {
			return await fetch(`${this.URL}${id}`)
				.then(res => res.json())
				.catch(err => err.msg);
		}
	};
}
