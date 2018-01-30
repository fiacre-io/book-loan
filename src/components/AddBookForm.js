import React from 'react';

class AddBookForm extends React.Component {

	createBook(event) {
		event.preventDefault();
		const book = {
			name: this.name.value,
			author: this.author.value,
			status: this.status.value,
			desc: this.desc.value,
			image: this.image.value,
		}
		this.props.addBook(book);
		this.bookForm.reset();
	}

	render() {
		return (
			<form ref={(input) => this.bookForm = input} className="book-edit" onSubmit={(e) => this.createBook(e)}>
				<input ref={(input) => this.name = input} type="text" placeholder="Title"/>
				<input ref={(input) => this.author = input} type="text" placeholder="Author"/>
				<select ref={(input) => this.status = input} >
					<option value="available">Available</option>
					<option value="unavailable">Unavailable</option>
				</select>
				<textarea ref={(input) => this.desc = input} placeholder="Desc"></textarea>
				<input ref={(input) => this.image = input} type="text" placeholder="Image"/>
				<button type="submit">+ Add Book</button>
			</form>
			)
	}
}

AddBookForm.propTypes = {
	addBook: React.PropTypes.func.isRequired
}

export default AddBookForm;