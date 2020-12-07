import React, { useEffect, useRef } from 'react';

import { SlideCss, filmPicksCss } from './css/Css';
import TitleCase from '../utils/TitleCase';

const Category = ({ infoObject: { genre, totalFilms, films } }) => {
	const filmList = useRef(null);
	useEffect(() => {
		films.forEach((film) => {
			let figure = document.createElement('figure');
			figure.style.flex = '0 0 auto';
			figure.style.margin = '10px';
			figure.style.width = '280px';
			figure.style.height = '150px';

			let figcaption = document.createElement('figcaption');
			figcaption.style.color= '#f2f2f2';
			figcaption.style.fontSize= '15px';
			figcaption.style.padding= '8px';
			figcaption.style.position= 'absolute';
			// figcaption.style.marginTop= '1px';
			figcaption.style.width= '80px';
			figcaption.style.textAlign = 'center';
			figcaption.style.backgroundColor= '#555';
			figcaption.textContent = TitleCase(genre);
			

			let img = document.createElement('img');
			img.style.width = '100%';
			img.style.height = '100%';
			img['data-type'] = film.id;
			img.id = film.id;
			img.src = film.src;

			figure.appendChild(img);
			figure.appendChild(figcaption);
			filmList.current.appendChild(figure);
		});
	});
	return (
		<>
			<article className="slide" style={SlideCss}>
				<section id="filmpicks" style={filmPicksCss} ref={filmList}>
				</section>
			</article>
			<br />
		</>
	);
};



export default Category;
