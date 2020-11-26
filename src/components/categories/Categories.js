import React, { useState, useEffect, useRef } from 'react';
// import TitleCase from "./TitleCase";
import { SlideShowCss } from './css/Css';

import Category from './Category';
import tempImg from './use_in_dev_only.jfif';

// retrived an array of movies and series
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
		type: 'movie',
		imgURLs: [tempImg],
		imgTotal(ary) {
			return ary.length;
		},
		getImg(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
		id: 0,
	},
	{
		genre: 'comedy',
		type: 'movie',
		imgURLs: [tempImg],
		imgTotal(ary) {
			return ary.length;
		},
		getImg(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
		id: 1,
	},
	{
		genre: 'horro',
		type: 'serise',
		imgURLs: [tempImg],
		imgTotal(ary) {
			return ary.length;
		},
		getImg(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
		id: 2,
	},
	{
		genre: 'Drama',
		type: 'serise',
		imgURLs: [tempImg],
		imgTotal(ary) {
			return ary.length;
		},
		getImg(index, ary) {
			if (index > ary.length || index < 0) {
				return ary[0];
			}
			return ary[index];
		},
		id: 3,
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
		</section>
	);
};

export default Categories;
