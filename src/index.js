import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import { BrowserRouter, Match, Miss} from 'react-router';
import CreateLibrary from './components/CreateLibrary';
import NotFound from './components/NotFound';
import App from './components/App';

const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
	return(
		<BrowserRouter basename={repo}>
		<div>
			<Match exactly pattern="/" component={CreateLibrary} />
			<Match pattern="/library/:libraryid" component={App} />
			<Miss component={NotFound} />
		</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#main'));