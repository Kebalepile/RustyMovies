import React, { useEffect, useRef, Fragment } from 'react';
import { MsCss, FilterCss } from './css/Css';
import TitleCase from '../utils/TitleCase';
/**
 * @description filters movies and series according to user's desire.
 */
const FilterMS = () => {
	let display = useRef(null);
	useEffect(() => {
		// retrives available categorise from
		// context.availableMS
		let MS = ['comedy', 'action', 'horror'];
		for (let i of MS) {
			let btn = document.createElement('button');
			btn.name = i;
			btn.textContent = TitleCase(i);
			btn.addEventListener('click', Filter);
			display.current.appendChild(btn);
		}
	});
	/**
	 *
	 * @param {Event} e
	 * @description
	 * filters movies and series and displays the desired,
	 * category for the user.
	 */
	const Filter = (e) => {
		console.log('someone cliked me');
		console.dir(e.target.name);
	};
	return (
		<Fragment>
			<div id="filterComponent" style={FilterCss}>
				<button> &#10094;</button>
				<section id="filterMS" style={MsCss} ref={display}></section>
				<button> &#10095;</button>
			</div>
			<hr />
		</Fragment>
	);
};

export default FilterMS;
