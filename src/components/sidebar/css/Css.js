const BtnCss = {
	cursor: 'pointer',
	backgroundColor: "inherit",
	height:"40px",
	width:"40px",
	fontSize:"25px",
	border: 'none',

};

export const SideBarCss = {
	display: 'none',
	height: '150px',
	width: '120px',
	padding: '5px',
};
export const CloseBtnCss = {
	...BtnCss,
	padding:"5px",
	backgroundColor:"gray",
	borderRadius:"50%"

};

export const OpenBtnCss = {
	...BtnCss,
}