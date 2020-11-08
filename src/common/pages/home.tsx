import { Container, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { link } from "fs"
import React from "react"
import { useHistory } from "react-router-dom"

export const Home = () => {
	const useStyles = makeStyles({
		containter: {
			minWidth: "100%",
		},
	})

	const classes = useStyles()

	return (
		<Container className={classes.containter}>
			<ProjectCardList />
		</Container>
	)
}

const ProjectCard = (props: ProjectItem) => {
	const useStyles = makeStyles({
		card: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "200px",
			margin: "10px",
			width: "30%",
			padding: "10px",
			transition: ".2s ease",

			"&:hover": {
				cursor: "pointer",
				transform: "scale(.97)",
				transition: ".2s ease",
			},
		},
	})

	const classes = useStyles()
	const history = useHistory()

	return (
		<Paper onClick={() => history.push(`${props.link}`)} className={classes.card}>
			<Typography>{props.name}</Typography>
		</Paper>
	)
}

const ProjectCardList = () => {
	const useStyles = makeStyles({
		containter: {
			width: "90%",
			display: "flex",
			flexWrap: "wrap",
			overflow: "auto",
		},
	})

	const classes = useStyles()
	return (
		<Container className={classes.containter}>
			{projs.map((p) => {
				return <ProjectCard {...p} />
			})}
		</Container>
	)
}

// todo move this shit
interface ProjectItem {
	name: string
	link: string
	src: string
}

const projs: ProjectItem[] = [
	{
		name: "Todo",
		link: "/todo",
		src: "",
	},
]
