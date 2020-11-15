import { Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { finished } from "stream"

interface Props {}

const words = "hi my name is owen".split(" ")
export const Typer = (props: Props) => {
	const {} = props
	const useStyles = makeStyles({
		indicator: { height: "60px", width: "60px" },
	})

	const classes = useStyles()

	const [idx, setIdx] = React.useState(0)
	const [iColour, setIColour] = React.useState("black")
	const [word, setWord] = React.useState<string>("")
	const [finish, setFinish] = React.useState(false)

	React.useEffect(() => {
		console.log(idx, words.length - 1)

		if (idx === words.length) {
			setFinish(true)
		}
	}, [idx])

	const handleKeyPress = (key: any) => {
		const currWord = words[idx]
		if (key.code === "Space") {
			if (currWord === word) {
				setIColour("green")
			} else {
				setIColour("red")
			}
			setWord("")
			setIdx(idx + 1)
		}
	}
	return (
		<Container>
			{!finish ? (
				<>
					<Typography variant="h2">typing game</Typography>
					<div>
						{words.map((w, i) => (
							<span key={i}>{` ${w} `}</span>
						))}
					</div>
					<textarea
						autoFocus
						onKeyPress={handleKeyPress}
						value={word}
						onChange={(e) => setWord(e.target.value.trim())}
						name=""
						id=""
						placeholder="type here"
					></textarea>
					<div className={classes.indicator} style={{ backgroundColor: iColour }}></div>
				</>
			) : (
				<div>
					<Typography variant="h2">finish</Typography>
				</div>
			)}
		</Container>
	)
}

export default Typer
