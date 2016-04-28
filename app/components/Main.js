import React from 'react';
import Footer from '../containers/Footer';

class Main extends React.Component {

	constructor (props) {
		super(props);
	}

	expandModule () {
		console.log('fn expandModule!');
	}

	render () {

		return (
			<div className="main">
				#Main Section#
				<br />
				<br />
				<a href="/#/">Open `home` component!</a>
				<br />
				<a href="/#/test">Open `Test` component!</a>
				<br />
				<br />
				<button onClick={this.expandModule}>ExpandModule fn()</button>
				<br />
				<br />
				<div className="content">
					{this.props.children}
				</div>

				<Footer />
			</div>
		);

	}

}

export default Main;