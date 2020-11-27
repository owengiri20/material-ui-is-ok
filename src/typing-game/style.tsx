import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles({
	indicator: { height: "60px", width: "60px" },
	typingArea: {
		margin: "20px 0",
		paddingBottom: "15px",
		padding: "10px",
		maxHeight: "200px",
		overflowY: "auto",
		fontSize: "20px",
		textAlign: "center",
	},
	textAreaStyles: {
		width: "100%",
		fontSize: "30px",
		padding: "10px",
		textAlign: "center",
		backgroundColor: "transparent",
		border: "0 !important",
		outline: "none",
		resize: "none",
	},
	line: {
		height: "2px",
		width: "100%",
		backgroundColor: "black",
		marginBottom: "20px",
	},
	timer: {
		display: "flex",
		justifyContent: "center",
	},
	timerText: {
		fontSize: "80px",
		opacity: ".4",
	},
})
