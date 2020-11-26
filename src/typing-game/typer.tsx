import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"

const j = require("./words.json")

interface TestWord {
	word: string
	status: "correct" | "incorrect" | "eh"
	cut: boolean
}

const everyNth = (arr: number[], nth: number) => arr.filter((_, i) => i % nth === nth - 1)

const genWords = (): TestWord[] => {
	const words: string[] = j.split("|")

	const cutOffs = everyNth(Array.from(Array(words.length).keys()), 6)

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
	const {} = props
	const useStyles = makeStyles({
		indicator: { height: "60px", width: "60px" },
		typingArea: {
			margin: "20px 0",
			border: "1px solid",
			padding: "10px",
			maxHeight: "200px",
			overflowY: "auto",
			fontSize: "20px",
			textAlign: "center",
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
	const [seconds, setSeconds] = React.useState(60)

	const [correctWords, setCorrectWords] = React.useState(0)
	const [wrongWords, setWrongWords] = React.useState(0)

	React.useEffect(() => {
		if (!start) return
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} else {
			setFinish(true)
		}
	})

	const handleRestart = () => {
		window.location.reload()
	}

	const handleKeyPress = (key: any) => {
		const currWord = props.yoyoWords[idx]
		if (!start) {
			setStart(true)
		}

		const currChar = currWord.word[charIdx]
		setCharIdx(charIdx + 1)

		if (currChar) {
			if (currChar === key.key) {
				setIColour("green")
			} else {
				setIColour("red")
			}
		}

		if (key.code === "Space") {
			setWord("")
			setIdx(idx + 1)
			setCharIdx(0)
			if (currWord.word === word) {
				setCorrectWords(correctWords + 1)
				props.setWords(
					props.yoyoWords.map((w, i) => {
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
					props.yoyoWords.map((w, i) => {
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
		return (correctWords / 60) * 60
	}

	const getColour = (status: "correct" | "incorrect" | "eh") => {
		if (status === "correct") return "green"
		if (status === "incorrect") return "red"
		if (status === "eh") return "black"
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

	const textDisplayRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		if (idx === 0) return
		const prevWord = props.yoyoWords[idx - 1]
		let sss = document.getElementById("fuck")
		if (sss && prevWord.cut) {
			sss.scrollTop = props.scrollHeight
			props.setScrollHeight(props.scrollHeight + 70)
		}
		console.log(prevWord.word)
	}, [idx])

	return (
		<Container>
			{!finish ? (
				<>
					<Typography variant="h2">typing game</Typography>
					<div className={classes.typingArea} ref={textDisplayRef} id="fuck">
						<Typography variant="subtitle1">
							{props.yoyoWords.map((w, i) => (
								<React.Fragment key={i}>
									<span style={{ color: getColour(w.status), fontSize: "40px", fontWeight: idx === i ? "bold" : "unset" }} key={i}>{` ${w.word} `}</span>
									{w.cut && <br />}
								</React.Fragment>
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
					{/* <div className={classes.indicator} style={{ backgroundColor: iColour }}></div> */}
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

interface Props {
	yoyoWords: TestWord[]
	setWords: (t: TestWord[]) => void

	scrollHeight: number
	setScrollHeight: (h: number) => void
}
export const TyperWrapper = (props: Props) => {
	const {} = props
	const [tWords, setTWords] = React.useState(genWords())
	const [scrollHeight, setScrollHeight] = React.useState(0)

	return <Typer scrollHeight={scrollHeight} setScrollHeight={setScrollHeight} yoyoWords={tWords} setWords={setTWords} />
}
