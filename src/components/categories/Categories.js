import React, { useState, useEffect, useRef } from 'react';
// import TitleCase from "./TitleCase";
import { SlideShowCss } from './css/Css';

import Category from './Category';
import tempImg from './use_in_dev_only.jfif';

// retrived an array of movies and series playlists sorted by genre
//  from context.AvailbaleToWatch
// array consists of:
// {
//     genere: e.g. "action",
//     type: movies/series,
//     images: url,
//     id
// }

let a = [
	{
		genre: 'action',
		films: [
			{ id: Math.floor(Math.random() * 10), src: tempImg,  name:'american gods sfsffsgsgsggg'  },
			{ id: Math.floor(Math.random() * 10), src: tempImg,  name:'bobcat'  },
		{ id: Math.floor(Math.random() * 10), src: tempImg,  name:'rick james'  }
	], // array of film objects
		totalFims(ary) {
			return ary.length;
		},
		getFilm(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
	},
	{
		genre: 'comedy',
		films: [{ id: Math.floor(Math.random() * 10), src: tempImg,  name:'jifi cat'  }],
		totalFims(ary) {
			return ary.length;
		},
		getFilm(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
	},{
		genre: 'reality',
		films: [
			{ id: Math.floor(Math.random() * 10), src: tempImg, name:'mike cat' },
			{ id: Math.floor(Math.random() * 10), src: tempImg, name:'rob cat' }], // array of film objects
		totalFims(ary) {
			return ary.length;
		},
		getFilm(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
	},
];

/**
 * @description
 * displays avaliable cateorgies of moives and series.
 */
const Categories = () => {
	
	return (
		<section className="categories">
			<div style={SlideShowCss} id="slideshow">
				{a.map((elem, index) => (
					<Category key={index} infoObject={elem} />
				))}
			</div>
			{/* offsetting footer css height which covers last category in 
			categories component. */}
			<div style={{ height: '60px' }}></div>
		</section>
	);
};

export default Categories;
