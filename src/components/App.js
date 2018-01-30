import React from 'react';
import base from '../base';
import Header from './Header';
import Shelves from './Shelves';
import ForLoan from './ForLoan';
import OnLoan from './OnLoan';
import Book from './Book';
import sampleBooks from '../sample-books';

class App extends React.Component {
	constructor() {
		super();
		this.addBook = this.addBook.bind(this);
		this.removeBook = this.removeBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		this.state = {
			books: {},
			order: {}
		};
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.libraryid}/books`, {
			context: this,
			state: 'books'
		});

		const localStorageRef = localStorage.getItem(`order-${this.props.params.libraryid}`);
		if (localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.libraryid}`, JSON.stringify(nextState.order));
	}

	addBook(book) {
		const books = { ...this.state.books };
		const timestamp = Date.now();
		books[`book-${timestamp}`] = book;
		this.setState({ books });
	}

	updateBook(key, updatedBook) {
		const books = { ...this.state.books };
		books[key] = updatedBook;
		this.setState({ books });
	}

	removeBook(key) {
		const books = { ...this.state.books };
		books[key] = null;
		this.setState({ books });
	}

	loadSamples() {
		this.setState({
			books: sampleBooks
		});
	}

	addToOrder(key) {
		const order = { ...this.state.order };
		order[key] = order[key] + 7 || 7;
		this.setState({ order });
	}

	removeFromOrder(key) {
		const order = { ...this.state.order };
		delete order[key];
		this.setState({ order });
	}

	render() {
		return (
			<div className="book-loan">
				<div className="menu">
					<Header tagline="Book Loan" />
				</div>
				<div className="content">
					<Shelves
						addBook={this.addBook}
						removeBook={this.removeBook}
						loadSamples={this.loadSamples}
						books={this.state.books}
						updateBook={this.updateBook}
						libraryid={this.props.params.libraryid}
					/>
					<div className="column">
						<ForLoan />
						<ul className="list-of-books">
							{Object.keys(this.state.books).map(key => (
								<Book key={key} index={key} details={this.state.books[key]} addToOrder={this.addToOrder} />
							))}
						</ul>
					</div>
					<OnLoan
						books={this.state.books}
						order={this.state.order}
						params={this.props.params}
						removeFromOrder={this.removeFromOrder}
					/>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
};

export default App;
