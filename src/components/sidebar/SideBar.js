import React, { useRef, useEffect } from 'react';
import more from "../../svg/more.svg";
import close from "../../svg/sleepy_eyes.svg";
import {CloseBtnCss, OpenBtnCss, SideBarCss } from './css/Css';
import TitleCase from '../utils/TitleCase';
const SideBar = () => {
	const sideBar = useRef(null),
		btn = useRef(null);

	useEffect(() => {
		// cta from context.Sidebar stuff
		let urls = ['profile', 'people online', 'developed By ?','about'];
		for (let url of urls) {
			let link = document.createElement('a');
			link.href = `/${url}`;
			link.textContent = TitleCase(url);
			sideBar.current.appendChild(link);
		}
	});

	const Close = (e) => {
		sideBar.current.style.display = 'none';
		btn.current.style.display = 'block';
	};
	const Open = (e) => {
		sideBar.current.style.display = 'flex';
		sideBar.current.style.flexFlow = 'column nowrap';
		btn.current.style.display = 'none';
	};
	return (
		<div>
			<img src={more} onClick={Open} ref={btn} style={OpenBtnCss}/>
			<div id="sideBar" ref={sideBar} style={SideBarCss}>
				<img src={close} onClick={Close} style={CloseBtnCss} title="close"/>
				<br/>
			</div>
		</div>
	);
};

export default SideBar;
