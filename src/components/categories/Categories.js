import React, { useState, useEffect, useRef } from 'react';
// import TitleCase from "./TitleCase";
import { SlideShowCss, SlideCss, NumberTextCss, _TextCss, NextCss, PrevCss } from './css/Css';
/**
 * @description
 * displays avaliable cateorgies of moives and series.
 */
const Categories = () => {
	return (
		<section className="categories">
			<div style={SlideShowCss}>
				<article className="slide" style={SlideCss}>
					<section style={NumberTextCss}>1/2</section>
					<img
						src="https://www.w3schools.com/howto/img_nature_wide.jpg"
						style={{ width: '100%', height: '100%' }}
					/>
					<section style={_TextCss}>Caption Text</section>
					<button className="prev" style={PrevCss}>
						&#10094;
					</button>

					<button className="next" style={NextCss}>
						&#10095;
					</button>
				</article>
			</div>
		</section>
	);
};

export default Categories;
