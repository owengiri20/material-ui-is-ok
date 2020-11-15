import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"

interface Props {
	ticker: number
}

const words = `Go is expressive, concise, clean, and efficient. Its concurrency mechanisms make it easy to write programs that get the most out of multicore and networked machines, while its novel type system enables flexible and modular program construction. Go compiles quickly to machine code yet has the convenience of garbage collection and the power of run-time reflection. It's a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language. Go is expressive, concise, clean, and efficient. Its concurrency mechanisms make it easy to write programs that get the most out of multicore and networked machines, while its novel type system enables flexible and modular program construction. Go compiles quickly to machine code yet has the convenience of garbage collection and the power of run-time reflection. It's a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language`.split(
	" ",
)

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
	const [seconds, setSeconds] = React.useState(60)
	const [correctChars, setCorrectChars] = React.useState(0)
	const [wrongChars, setWrongChars] = React.useState(0)

	const [correctWords, setCorrectWords] = React.useState(0)

	const [wrongWords, setWrongWords] = React.useState(0)

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
		window.location.reload()
		// setIdx(0)
		// setIColour("black")
		// setWord("")
		// setFinish(false)
		// setStart(false)
		// setSeconds(60)
	}

	const handleKeyPress = (key: any) => {
		const currWord = words[idx]
		if (!start) {
			setStart(true)
		}

		const currChar = currWord[charIdx]
		console.log("logging char index---------", charIdx)
		// console.log("logging word---------", currChar)

		console.log("logging char---------", currChar)
		setCharIdx(charIdx + 1)

		if (currChar) {
			if (currChar === key.key) {
				setIColour("green")
			} else {
				setIColour("red")
			}
		}

		if (key.code === "Space") {
			console.log("hit space -------")

			setWord("")
			setIdx(idx + 1)
			setCharIdx(0)
			if (currWord === word) {
				setCorrectWords(correctWords + 1)
			} else {
				setWrongWords(wrongWords + 1)
			}

			return
		}
	}

	const handleBackSpace = (key: any) => {
		// characters
		if (word.length === 0) return
		if (key.code && key.code === "Backspace") {
			if (charIdx === 0) return
			setCharIdx(charIdx - 1)
			console.log("backspace")
		}
	}

	const calcWPM = () => {
		// idx
		return (correctWords / 60) * 60
	}

	const getResult = (wpm: number) => {
		let label = ""
		if (wpm < 30) {
			label = "shit"
		}
		if (wpm >= 30 && wpm < 50) {
			label = "not bad"
		}
		if (wpm >= 50 && wpm < 70) {
			label = "above average"
		}
		if (wpm >= 70 && wpm < 90) {
			label = "quick boi"
		}

		if (wpm >= 90 && wpm < 110) {
			label = "you're pretty good"
		}

		if (wpm >= 110 && wpm < 130) {
			label = "suuuuper fast"
		}

		if (wpm >= 130) {
			label = "stop cheating"
		}

		return <Typography variant="h5">result: {label}</Typography>
	}

	return (
		<Container>
			{!finish ? (
				<>
					<Typography variant="h2">typing game</Typography>
					<div className={classes.typingArea}>
						<Typography style={{ fontSize: "20px" }} variant="subtitle1">
							{words.map((w, i) => (
								<span style={{ backgroundColor: i === idx ? "yellow" : "" }} key={i}>{` ${w} `}</span>
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
						<Typography variant="subtitle1">correct words: {correctWords}</Typography>
						<Typography variant="subtitle1">wrong words: {wrongWords}</Typography>
					</div>
				</>
			) : (
				<div>
					<Typography variant="h4">finish</Typography>
					<Typography variant="h4">wpm: {calcWPM()} (not so accurate at the moment) </Typography>
					<Typography variant="h4">correct words: {correctWords}</Typography>
					<Typography variant="h4">wrong words: {wrongWords}</Typography>

					<hr />

					{getResult(calcWPM())}

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
