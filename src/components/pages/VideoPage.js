import React, { useEffect, useContext } from 'react';
// import videoContext from '../../context/videos/Context';
import playBtn from '../../svg/play.svg';
import rb from '../../svg/rb.svg';
import ff from '../../svg/ff.svg';
const VideoPage = () => {
	// const { getVideo } = useContext(videoContext);
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

	const Skip = (direction) => {
			switch (direction) {
				case 'forward':
					console.log('30 seconds forward');
					break;
				case 'backward':
					console.log('30 seconds backward');
					break;
				default:
					break;
			}
		},
		PlayPause = () => {
			console.log('play pause');
		};
	return (
		<div id="videopage">
			<video src="#" controls></video>
			<section id="ctrls">
				<span>time stamp gdosg shsh sdfjosgs</span>

				<img src={rb} alt="skip backward" className="ctrlBtn skip" onClick={() => Skip('backward')} />
				<img src={ff} alt="skip forward" className="ctrlBtn skip" onClick={() => Skip('forward')} />
				<div>
					video length<div id="watched"></div>
				</div>
				<img src={playBtn} alt="play button" className="ctrlBtn" onClick={PlayPause} />
			</section>
		</div>
	);
};

export default VideoPage;
