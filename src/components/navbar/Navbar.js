import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavBarCss, SearchCss, LogoCss } from './css/Css';
import SideBar from '../sidebar/SideBar';
const Navbar = () => {
	const [search, setSearch] = useState('search for movie/series');
	const Change = (e) => {
		console.log(e.target.value);
		setSearch(e.target.value);
	};
	return (
		<Fragment>
			<nav style={NavBarCss}>
				<SideBar />
				<input type="search" value={search} onChange={Change} style={SearchCss} />
				<Link to="/">
					<img href="#" atl="Logo" style={LogoCss} />
				</Link>
			</nav>
		</Fragment>
	);
};

export default Navbar;
