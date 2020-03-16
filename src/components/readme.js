import React from "react";

const Readme = () => (
	<React.Fragment>
		<h1>Create a Chuck Norris Joke Application</h1>

		<p>
			We as developers like Chuck Norris jokes. Therefor we created the following assignment to test your Frontend
			skills/ knowledge.
		</p>
		<p>
			Please create a git repo (can be local) before you start this assignment. When adding a commit please give a
			proper description to explain your choices.
		</p>
		<p>
			It only has to run in chrome (so you can use es6). Please don&#39;t use any boilerplates. You can/may use
			any framework/lib you want.
		</p>
		<p>When finished send a link or send your folder(zip with .git folder).</p>
		<h2>Assignment</h2>
		<hr />
		<p>
			We want an Application where we can fetch 10 Random Chuck Norris jokes. These jokes can be fetched from the
			following API <a href='http://api.icndb.com/jokes/random/10'>http://api.icndb.com/jokes/random/10</a>.
		</p>
		<p>
			When these jokes are fetched via a button they need to be displayed in a list. In this list we can mark
			certain jokes as favourite. The favourite jokes will appear in a favourites list with a max of 10 unique
			items. There should be an option to remove jokes from the favourite list as well.
		</p>
		<p>
			On refresh the favourites lists should be stored so next time when i visit the app my favourites should be
			present.
		</p>
		<p>
			We can also turn a timer on/off via a button (every 5 seconds). This will add one random joke to the
			favourites list <a href='http://api.icndb.com/jokes/random/1'>http://api.icndb.com/jokes/random/1</a> until
			the list has 10 items.
		</p>
	</React.Fragment>
);

export { Readme };
