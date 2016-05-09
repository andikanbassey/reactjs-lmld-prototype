'use strict';

import React from 'react';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import BackBlock from '../components/BackBlock';
import { Router, Link, History } from 'react-router';

class Main extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			loadComponent: null,
			hideMainContent: false
		};

		this.timelineHideMainContent = null;

		// Component DOM elements
		this.els = {};

	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	/*
	 * Display the yellow square block animation, mount the requested component
	 * remove the square block, revealing the `main` component content area
	 * only when user press the logo button to go back
	 * @param: componentName
	 * @return: null
	 */
	hideMainContentHandler() {

		if (this.isHome() !== 'home') {

			this.timelineHideMainContent = this.generateTimelineHideMainContent();

			this.timelineHideMainContent.play();

		}

	}

	generateTimelineHideMainContent() {

		// destroy if exists as we need to recalculate pos
		if (this.timelineHideMainContent !== null) {
			this.timelineHideMainContent.clear();
			this.timelineHideMainContent = null;
		}

		let tl;
		let backBlock = document.querySelector('.back-block');
		let headerOffsetHeight = document.querySelector('header').offsetHeight;
		let content = document.querySelector('.main > .content');
		let mainLogo = document.querySelector('header .logo-container');

		const onStartCallback = () => {
			backBlock.classList.add('show');
			this.setNoScroll(false);
			this.setState({
				hideMainContent: true
			});
		};

		const onCompleteCallback = () => {
			this.setState({
				hideMainContent: false
			});
		};

		const onReverseCompleteCallback = () => {

		};

		let calcWdith = () => {
			return window.innerWidth - 120;
		};

		let calcHeight = () => {
			return window.innerHeight - headerOffsetHeight;
		};

		tl = new window.TimelineLite({
			onStart: onStartCallback,
			onComplete: onCompleteCallback,
			onReverseComplete: onReverseCompleteCallback
		});

		tl.to(mainLogo, 0.3, { css: { opacity: 0 } }, 0);

		tl.to(content, 1, { css: { opacity: 0 }, onComplete: () => {
				window.location.hash = '/';
				//this.setNoScroll(false);
			}
		}, 0);

		tl.fromTo(backBlock, 0.3, { css: { width: '0px', height: '0px', ease: window.Bounce.easeOut } }, { css: { width: '50px', height: '50px', ease: window.Bounce.easeOut } }, 0);

		tl.to(backBlock, 0.3, { css: { width: calcWdith(), height: calcHeight(), marginTop: (headerOffsetHeight / 2) } }, 0.4);

		tl.to(content, 0.2, { css: { opacity: 1 } });

		tl.to(backBlock, 0.5, { css: { marginTop: window.innerHeight, ease: window.Bounce.easeOut } }, 1);

		tl.pause();

		return tl;
	}

	setNoScroll(bool) {

		let cl = document.body.classList;

		bool ? cl.add('noscroll') : cl.remove('noscroll');

	}

	isHome() {

		return this.props.location.pathname === '/' ? 'home' : 'lg-bg';

	}

	setElement(key, node) {

		this.els[key] = node;

	}

	render() {

		return(

			<div className={'main' + ' ' + this.isHome() + ' ' + (this.state.hideMainContent ? 'hidden' : '')}>
				<Header component={Header} hideMainContentHandler={this.hideMainContentHandler.bind(this)} />
				<BackBlock ref={this.setElement.bind(this, 'backBlock')} />
				<div className="content">
					{React.cloneElement(this.props.children, { setNoScroll: this.setNoScroll.bind(this) })}
					{this.state.loadComponent ? <this.state.loadComponent /> : null}
				</div>
				<Footer isHome={this.isHome()} />
			</div>
		);

	}

}

export default Main;