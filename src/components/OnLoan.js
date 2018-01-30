import React from 'react';
import ReactToPrint from 'react-to-print';

class OnLoan extends React.Component {
	constructor() {
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key) {
		const book = this.props.books[key];
		const count = this.props.order[key];
		const moment = require('moment');
		const time = moment()
			.add({ days: count })
			.format('LL');
		const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;
		if (!book || book.status === 'unavailable') {
			return (
				<li key={key}>
					Sorry, the librarian has eaten {book ? book.name : 'this book'} {removeButton}
				</li>
			);
		}

		return (
			<li key={key}>
				<span>
					{book.name}: {book.author}
					{removeButton}
				</span>
				<span className="return">Return on: {time}</span>
			</li>
		);
	}

	render() {
		const orderIds = Object.keys(this.props.order);
		return (
			<div className="column">
				<h4>Your Loans</h4>
				<p className="signin">Click 'Available' to add a book for one or more weeks.</p>
				<ul className="order" ref={el => (this.componentRef = el)}>
					{orderIds.map(this.renderOrder)}
				</ul>
				<ReactToPrint
					content={() => this.componentRef}
					trigger={() => <button className="print">Print Loans</button>}
				/>
			</div>
		);
	}
}

OnLoan.propTypes = {
	books: React.PropTypes.object.isRequired,
	order: React.PropTypes.object.isRequired,
	removeFromOrder: React.PropTypes.func.isRequired
};

export default OnLoan;
