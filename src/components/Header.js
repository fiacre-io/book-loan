import React from 'react';

const Header = (props) => {
	return (
		<header>
		<div className="header">
		<h1 className="title">{props.tagline}</h1>
		</div>
		</header>
		)
}

Header.propTypes = {
	tagline: React.PropTypes.string.isRequired
}

export default Header;