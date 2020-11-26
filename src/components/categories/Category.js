import React from 'react';

import { SlideCss, NumberTextCss, _TextCss, NextCss, PrevCss } from './css/Css';
import TitleCase from '../utils/TitleCase';

const Category = ({ infoObject: { genre, id, type, imgURLs, imgTotal } }) => {
	return (
		<>
			<article className="slide" style={SlideCss}>
				<section style={NumberTextCss}>{`1/${imgTotal(imgURLs)}`}</section>
				<img src={imgURLs[0]} style={{ width: '100%', height: '100%' }} />
				<section style={_TextCss}>{(TitleCase(genre), `it's a ${type}`)}</section>
				<button className="prev" style={PrevCss}>
					&#10094;
				</button>

				<button className="next" style={NextCss}>
					&#10095;
				</button>
			</article>
			<br />
		</>
	);
};

export default Category;
