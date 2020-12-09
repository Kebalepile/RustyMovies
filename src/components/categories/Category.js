import React, { useEffect, useRef } from 'react';
import { SlideCss, filmPicksCss, imgCss } from './css/Css';
import left from '../../svg/left.svg';
import right from '../../svg/right.svg';
import TitleCase from '../utils/TitleCase';
import ColorGenerator from '../utils/ColorGenerator';
import { nanoid } from 'nanoid';
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
			article.setAttribute('id', nanoid());

			const title = document.createElement('b');
			title.style.color = '#f2f2f2';
			title.style.fontSize = '15px';
			title.style.padding = '8px';
			title.style.textAlign = 'center';
			title.style.backgroundColor = ColorGenerator();
			title.style.borderRadius = '2px';
			title.style.width = '130px';
			title.style.whiteSpace = 'nowrap';
			title.style.overflow = 'hidden';
			title.style.textShadow = `${'2px 0 0 #222, -2px 0 0 #222, 0 2px 0 #222, 0 -2px 0 #222'},${'1px 1px #222, -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222'}`;
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

	let slideIndex = 0;

	const showSlide = (n) => {
		
			try {
				const slides = filmList.current.children;
				if (n > slides.length) slideIndex = 1;
				if (n < slides.length) slideIndex += 1;
				let i = 0;
				while (i < slides.length) {
					slides[i].style.display = 'none';
					i += 1;
				}
				
				let index = ((slideIndex - 1) === -1) ? 0 :(slideIndex - 1) // handle out of range index error.
				
				slides[index].style.display = 'block';
			} catch (err) {
				console.error(err);
			}
		},
		nextSlide = (n) => {
			showSlide((slideIndex += n));
		};
	return (
		<>
			<article className="slide" style={SlideCss}>
				<img src={left} style={imgCss} onClick={() => nextSlide(-1)} />

				<section id="filmpicks" style={filmPicksCss} ref={filmList}></section>

				<img src={right} style={imgCss} onClick={() => nextSlide(1)} />
			</article>
			<br />
		</>
	);
};

export default Category;
