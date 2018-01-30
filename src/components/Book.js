import React from 'react';

class Book extends React.Component {
	render () {
		const { details, index } = this.props;
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'Available' : 'Unavailable';
		return (
			<li className="menu-book">
				<img src={details.image} alt={details.name} />
				<h5 className="book-name">
					{details.name}
				</h5>
				<span className="author">{details.author}</span>
				<p>{details.desc}</p>
				<button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
			</li>
		)
	}
}

Book.propTypes = {
	details: React.PropTypes.object.isRequired,
	index: React.PropTypes.string.isRequired,
	addToOrder: React.PropTypes.func.isRequired,
}

export default Book;