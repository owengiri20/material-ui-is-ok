import { Container, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

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
			height: "200px",
			margin: "10px",
			width: "30%",
			padding: "10px",
		},
	})

	const classes = useStyles()

	return (
		<Paper className={classes.card}>
			<Typography>{props.name}</Typography>
		</Paper>
	)
}

const ProjectCardList = () => {
	const useStyles = makeStyles({
		containter: {
			// height: "80vh",
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
	{
		name: "Todo",
		link: "/todo",
		src: "",
	},
	{
		name: "Todo",
		link: "/todo",
		src: "",
	},
	{
		name: "Todo",
		link: "/todo",
		src: "",
	},
	{
		name: "Todo",
		link: "/todo",
		src: "",
	},
]
