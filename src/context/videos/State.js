import React, { useReducer } from 'react';
import context from './Context';
import reducer from './Reducer';
import { VIDEO } from './types';
const State = (props) => {
	const initialState = {
		videos: null,
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	/**
	 * @param {string} id
	 * @param {string} genre
	 * @description retrives video object of given id
	 * @returns Object || null
	 */
	const getVideo = (id, genre) => {
		if (state.videos) {
			const category = state.videos[genre];
			if (Array.isArray(category) && category.length > 0) {
				return category.reduce((acc, cur) => {
					if (cur.id === id && cur.g) {
						acc = cur;
					}
					return acc;
				}, null);
			}
			return;
		}
	};

	return (
		<context.Provider
			value={{
				getVideo,
			}}
		>
			{props.children}
		</context.Provider>
	);
};
export default State;
