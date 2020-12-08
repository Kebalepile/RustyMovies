import React, { useEffect, useRef } from 'react';
import { SlideCss, filmPicksCss, imgCss } from './css/Css';
import left from '../../svg/left.svg';
import right from '../../svg/right.svg';
import TitleCase from '../utils/TitleCase';

const Category = ({ infoObject: { genre, films } }) => {
	const filmList = useRef(null);

	useEffect(() => {
		films.forEach((film) => {
			const article = document.createElement('article');
			article.style.flex = '0 0 auto';
			article.style.margin = '10px';
			article.style.width = '230px';
			article.style.height = '150px';
			article.classList.add('show-cell');
			article.setAttribute('title', film.name);

			const title = document.createElement('b');
			title.style.color = '#f2f2f2';
			title.style.fontSize = '15px';
			title.style.padding = '8px 8px 8px 0';
			title.style.textAlign = 'center';
			title.style.backgroundColor = 'inherit';
			title.style.width = '130px';
			title.style.whiteSpace = 'nowrap';
			title.style.overflow = 'hidden';
			title.textContent = TitleCase(film.name);

			const type = document.createElement('b');

			type.style.fontSize = '15px';
			type.style.padding = '8px 8px 8px 0';
			type.style.textAlign = 'center';
			type.style.width = '100px';
			type.style.width = '130px';
			type.style.whiteSpace = 'nowrap';
			type.style.overflow = 'hidden';
			type.textContent = TitleCase(genre);

			const info = document.createElement('div');
			info.style.display = 'flex';
			info.style.justifyContent = 'space-between';
			info.appendChild(title);
			info.appendChild(type);

			const img = document.createElement('img');
			img.style.width = '100%';
			img.style.height = '100%';
			img.style.cursor = 'pointer';
			img.style.borderRadius = '2px';
			img['data-type'] = film.id;
			img.id = film.id;
			img.src = film.src;

			img.addEventListener('click', (e) => {
				const url = new URL(location.origin + '/watch');
				url.searchParams.set('q', e.target['data-type']);
				url.searchParams.set('genre', genre);
				location.assign(url);
			});

			article.appendChild(img);
			article.appendChild(info);
			filmList.current.appendChild(article);
		});
	});

	return (
		<>
			<article className="slide" style={SlideCss}>
				<img src={left} style={imgCss} />

				<section id="filmpicks" style={filmPicksCss} ref={filmList}></section>

				<img src={right} style={imgCss} />
			</article>
			<br />
		</>
	);
};

export default Category;
