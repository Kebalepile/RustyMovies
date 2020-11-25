export const SlideShowCss = {
	position: 'relative',
	margin: 'auto',
	minWidth: '320px',
};

export const SlideCss = {
	width: '250px',
	height: '150px',
	position: 'relative',
	margin: 'auto',
};
// next and prev same styles
const NPCss = {
	cursor: 'pointer',
	position: 'absolute',
	top: '50%',
	width: 'auto',
	padding: '16px',
	marginTop: '-22px',
	color: 'white',
	fontWeight: 'bold',
	fontSize: '18px',
	borderRadius: '2px',
	userSelect: 'none',
	border: 'none',
	opacity: '0.6',
	height: '40px',
	backgroundColor: 'inherit',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

export const NextCss = {
	...NPCss,
	right: 2,
};
export const PrevCss = {
	...NPCss,
	left: 2,
};
export const _TextCss = {
	color: '#f2f2f2',
	fontSize: '15px',
	padding: '8px 12px',
	position: 'absolute',
	bottom: '8px',
	width: '100%',
	textAlign: 'center',
};
export const NumberTextCss = {
	color: '#f2f2f2',
	fontSize: '12px',
	padding: '8px 12px',
	position: 'absolute',
	top: '0',
};
