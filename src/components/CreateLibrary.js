import React from 'react';
import { getLibTitle } from '../helpers';

class CreateLibrary extends React.Component {

	goToLibrary(event) {
		event.preventDefault();
		const libraryId = this.libraryInput.value;
		this.context.router.transitionTo(`/library/${libraryId}`);
	}

	render() {
		return (
			<div className="main-library">
			<form className="library-selector" onSubmit={(e) => this.goToLibrary(e)}>
			<h2>Create Your Library</h2>
			<p>Enter a name for your library or use the generated name below.</p>
			<input type="text" required placeholder="Library Name" defaultValue={getLibTitle()} ref={(input) => {this.libraryInput = input}} />
			<button type="submit">Create Library >>></button>
			</form>
			</div>
		)
	}
}

CreateLibrary.contextTypes = {
	router: React.PropTypes.object
}

export default CreateLibrary;