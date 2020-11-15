import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"

interface Props {
	ticker: number
}

const words = "hi my name is owen".split(" ")
export const Typer = (props: Props) => {
	const {} = props
	const useStyles = makeStyles({
		indicator: { height: "60px", width: "60px" },
		typingArea: {
			margin: "20px 0",
			border: "1px solid",
			padding: "10px",
		},

		textAreaStyles: { width: "100%", fontSize: "20px", padding: "10px" },
	})

	const classes = useStyles()

	const [idx, setIdx] = React.useState(0)
	const [charIdx, setCharIdx] = React.useState(0)

	const [iColour, setIColour] = React.useState("black")
	const [word, setWord] = React.useState<string>("")
	const [finish, setFinish] = React.useState(false)
	const [start, setStart] = React.useState(false)
	const [wpm, setWpm] = React.useState(0)
	const [seconds, setSeconds] = React.useState(500)
	const [correctChars, setCorrectChars] = React.useState(0)

	React.useEffect(() => {
		if (!start) return
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} else {
			setFinish(true)
			// setSeconds('BOOOOM!');
			console.log("boom")
		}
	})

	const handleRestart = () => {
		setIdx(0)
		setIColour("black")
		setWord("")
		setFinish(false)
		setStart(false)
		setSeconds(60)
	}

	const handleKeyPress = (key: any) => {
		console.log("yoyo")

		console.log(key)

		const currWord = words[idx]
		if (!start) {
			setStart(true)
		}

		if (key.code === "Space") {
			if (currWord === word) {
				setIColour("green")
			} else {
				setIColour("red")
			}
			setWord("")
			setIdx(idx + 1)
			return
		}

		// characters
		// if (word.length === 0) return
		// if (key.code && key.code === "Backspace") {
		// 	console.log("backspace")
		// }

		const currChar = currWord[charIdx]
		console.log("logging word---------", currChar)
		setCharIdx(charIdx + 1)
		if (currChar === key.key) {
			setIColour("green")
		} else {
			setIColour("red")
		}

		// setCharIdx(charIdx + 1)
		// console.log("logging word---------", word)
		// console.log("logging partial word---------", currWord[charIdx])
	}

	const handleBackSpace = (key: any) => {
		// characters
		if (word.length === 0) return
		if (key.code && key.code === "Backspace") {
			console.log("backspace")
		}
	}

	const calcWPM = () => {
		// idx
	}

	return (
		<Container>
			{!finish ? (
				<>
					<Typography variant="h2">typing game</Typography>
					<div className={classes.typingArea}>
						<Typography style={{ fontSize: "20px" }} variant="subtitle1">
							{words.map((w, i) => (
								<span key={i}>{` ${w} `}</span>
							))}
						</Typography>
					</div>
					<textarea
						className={classes.textAreaStyles}
						autoFocus
						onKeyPress={handleKeyPress}
						onKeyDown={handleBackSpace}
						value={word}
						onChange={(e) => setWord(e.target.value.trim())}
						name=""
						id=""
						placeholder="type here"
					></textarea>
					<div className={classes.indicator} style={{ backgroundColor: iColour }}></div>
					<div>
						<Typography variant="h3">{seconds}</Typography>
					</div>
				</>
			) : (
				<div>
					<Typography variant="h2">finish</Typography>
					<Button variant="contained" color="primary" onClick={handleRestart}>
						Restart
					</Button>
				</div>
			)}
		</Container>
	)
}

export const TyperWrapper = (props: Props) => {
	const {} = props
	const [ticker, setTicker] = React.useState(0)
	// setInterval(() => setTicker(ticker + 1), 1000)
	return <Typer ticker={ticker} />
}
