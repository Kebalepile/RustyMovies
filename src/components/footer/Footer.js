import React, { useEffect, useRef, Fragment } from 'react';
import { PartialCss } from './css/Css';
import displayNav from '../../svg/enlarge.svg';
import compressNav from '../../svg/compress.svg';
import TitleCase from '../utils/TitleCase';

const Footer = () => {
	const addBtns = useRef(null),
		controlBtn = useRef(null),
		footerNavbar = useRef(null);
	useEffect(() => {
		// retrives available categorise from
		// context.availableMS
		let MS = ['Chat', 'Playlist'];
		for (let i of MS) {
			let btn = document.createElement('button');
			btn.name = i;
			btn.textContent = TitleCase(i);
			btn.addEventListener('click', Filter);
			addBtns.current.appendChild(btn);
		}
	});

	const Close = (e) => {
		controlBtn.current.style.display = 'block';
		footerNavbar.current.style.display = 'none';
		console.log('clicked');
	};
	const Open = (e) => {
		controlBtn.current.style.display = 'none';
		footerNavbar.current.style.display = 'block';
		console.log('clicked');
	};
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
		<footer>
			<img src={displayNav} ref={controlBtn} onClick={Open} title="chat and more..." className="footerCtrl" />
			<div id="footerUiUx" ref={footerNavbar}>
				<img src={compressNav} onClick={Close} className="footerCtrl" title="minimize chat and more ..." />
				<section>
					<button> &#10094;</button>
					<section id="chat_and_playlist" style={PartialCss} ref={addBtns}></section>
					<button> &#10095;</button>
				</section>
			</div>
		</footer>
	);
};


export default Footer;
