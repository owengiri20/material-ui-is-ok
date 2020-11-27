import { Button, Container, Typography } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
import { useStyles } from "./style"

// disable scroll wheel
window.addEventListener(
	"wheel",
	function (e) {
		e.preventDefault()
	},
	{ passive: false },
)
const j = require("./words.json")

interface TestWord {
	word: string
	status: "correct" | "incorrect" | "eh"
	cut: boolean
}
// id of text display
const DISPLAY_ID = "textDisplay"

// creates an array of every "nth" number
const everyNth = (arr: number[], nth: number) => arr.filter((_, i) => i % nth === nth - 1)

const shuffle = (arr: string[]) => {
	let currentIndex = arr.length,
		temporaryValue,
		randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = arr[currentIndex]
		arr[currentIndex] = arr[randomIndex]
		arr[randomIndex] = temporaryValue
	}

	return arr
}

// generate list of words of json file
const genWords = (): TestWord[] => {
	const words: string[] = shuffle(j.split("|"))
	const cutOffs = everyNth(Array.from(Array(words.length).keys()), 5)
	const testWords: TestWord[] = words.map((w, i) => {
		let c = false
		if (cutOffs.includes(i)) {
			c = true
		}
		return { word: w, status: "eh", cut: c }
	})

	return testWords
}

export const Typer = (props: Props) => {
	const classes = useStyles()
	const history = useHistory()

	const [idx, setIdx] = React.useState(0)
	const [charIdx, setCharIdx] = React.useState(0)

	const [word, setWord] = React.useState<string>("")
	const [finish, setFinish] = React.useState(false)
	const [start, setStart] = React.useState(false)
	const [seconds, setSeconds] = React.useState(60)

	const [correctWords, setCorrectWords] = React.useState(0)
	const [wrongWords, setWrongWords] = React.useState(0)

	React.useEffect(() => {
		if (!start) return
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)

			// if (seconds < 55) {
			// 	clearTimeout(ss(() => {}))
			// 	setSeconds(60)
			// 	setStart(false)
			// }
		} else {
			setFinish(true)
		}
	})

	const handleStatus = (correct: boolean) => {
		if (correct) {
			setCorrectWords(correctWords + 1)
			props.setWords(
				props.words.map((w, i) => {
					if (i === idx) {
						return {
							...w,
							status: "correct",
						}
					}
					return w
				}),
			)
		} else {
			setWrongWords(wrongWords + 1)
			props.setWords(
				props.words.map((w, i) => {
					if (i === idx) {
						return {
							...w,
							status: "incorrect",
						}
					}
					return w
				}),
			)
		}
	}

	const handleRestart = () => {
		window.location.reload()
		// history.action.
		// props.setWords(genWords())
		// setStart(false)
		// setFinish(false)
		// setWord("")
		// setIdx(0)
		// setCharIdx(0)
		// setWrongWords(0)
		// setCorrectWords(0)
		// setSeconds(60)
	}

	const handleKeyPress = (key: any) => {
		const currWord = props.words[idx]
		if (!start) {
			setStart(true)
		}
		setCharIdx(charIdx + 1)

		if (key.code === "Space") {
			if (word === "") return
			setWord("")
			setIdx(idx + 1)
			setCharIdx(0)
			if (currWord.word === word) {
				handleStatus(true)
			} else {
				handleStatus(false)
			}

			return
		}
	}

	const handleBackSpace = (key: any) => {
		if (word.length === 0) return
		if (key.code && key.code === "Backspace") {
			if (charIdx === 0) return
			setCharIdx(charIdx - 1)
		}
	}

	const calcWPM = () => (correctWords / 60) * 60

	const getColour = (status: "correct" | "incorrect" | "eh") => {
		if (status === "correct") return "green"
		if (status === "incorrect") return "red"
		if (status === "eh") return "#373737"
	}

	const onCurrWord = (currIdx: number) => idx === currIdx

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

	// useffect to handle scroll height of text display
	React.useEffect(() => {
		// if first word
		if (idx === 0) return

		// get prevous word
		const prevWord = props.words[idx - 1]

		// get textDisplay div
		let textDisplay = document.getElementById(DISPLAY_ID)

		// handle scroll
		if (textDisplay && prevWord.cut) {
			textDisplay.scrollTop = props.scrollHeight
			props.setScrollHeight(props.scrollHeight + 70)
		}
	}, [idx])

	return (
		<Container style={{}}>
			{!finish ? (
				<>
					<div className={classes.timer}>
						<Typography className={classes.timerText} variant="h3">
							{seconds}
						</Typography>
					</div>
					<div className={classes.typingArea} id={DISPLAY_ID}>
						<Typography variant="subtitle1">
							{props.words.map((w, i) => (
								<React.Fragment key={i}>
									<span
										style={{
											padding: "5px",
											backgroundColor: onCurrWord(i) ? "#d7d9ff" : "",
											color: getColour(w.status),
											fontSize: "35px",
											fontWeight: onCurrWord(i) ? "bold" : "unset",
										}}
										key={i}
									>{` ${w.word} `}</span>
									{w.cut && <br />}
								</React.Fragment>
							))}
						</Typography>
					</div>
					<div className={classes.line}></div>
					<textarea
						className={classes.textAreaStyles}
						autoFocus
						onKeyPress={handleKeyPress}
						onKeyDown={handleBackSpace}
						value={word}
						onChange={(e) => setWord(e.target.value.trim())}
						placeholder={idx === 0 ? "Start Typing!" : ""}
					></textarea>
					<Button onClick={handleRestart}>Reset</Button>
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

interface Props {
	words: TestWord[]
	setWords: (t: TestWord[]) => void
	theme: "dark" | "light"
	setTheme: (s: "dark" | "light") => void
	scrollHeight: number
	setScrollHeight: (h: number) => void
}
export const TyperWrapper = (props: Props) => {
	const {} = props
	const [words, setWords] = React.useState(genWords())
	const [scrollHeight, setScrollHeight] = React.useState(0)
	const [theme, setTheme] = React.useState<"dark" | "light">("light")

	return <Typer setTheme={setTheme} theme={theme} scrollHeight={scrollHeight} setScrollHeight={setScrollHeight} words={words} setWords={setWords} />
}
