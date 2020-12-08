import React, { useEffect, useContext } from 'react';
import videoContext from '../../context/videos/Context';
const VideoPage = () => {
    const {getVideo} = useContext(videoContext);
	useEffect(() => {
		const params = new URLSearchParams(location.search);

		if (params.has('q') && params.has('genre')) {
            console.log(params.get('q'));
            console.log(params.get('genre'));
		} else {
			if (history.length <= 2) {
				location.replace(location.origin);
			} else {
				history.back();
			}
		}
	}, []);
	return (
		<div id="videopage">
			<video src="#" controls></video>
		</div>
	);
};

export default VideoPage;
