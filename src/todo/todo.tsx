import {
	Button,
	Checkbox,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Modal,
	Typography,
} from "@material-ui/core"
import moment from "moment"
import React from "react"
import { Add, Delete } from "@material-ui/icons/"
import TextField from "@material-ui/core/TextField"
import { ordinal, uuid } from "./utils"

interface TodoItem {
	id: string
	title: string
	isDone: boolean
}

export const Todo = () => {
	const [addModalOpen, setAddModalOpen] = React.useState(false)
	const [listState, setListState] = React.useState<TodoItem[]>([])

	const useStyles = makeStyles({
		topRow: {
			display: "flex",
			justifyContent: "space-between",
		},
		addBar: {
			width: "100%",
			display: "flex",
			justifyContent: "flex-end",
			marginBottom: "20px",
		},
	})

	const classes = useStyles()

	const m = moment()
	const day = m.format("dddd")
	const month = m.format("MMMM")
	const date = m.date()

	const onAdd = (t: TodoItem) => {
		setListState([...listState, t])
	}

	const onRemove = (t: TodoItem) => {
		setListState(listState.filter((v) => v.id != t.id))
	}

	const toggleDone = (t: TodoItem) => {
		setListState(listState.map((v) => (v.id === t.id ? { ...t, isDone: !t.isDone } : v)))
	}

	return (
		<>
			<Container maxWidth={"sm"}>
				<div className={"top"}>
					<div className={classes.topRow}>
						<Typography variant="h3">{`${day}, ${ordinal(date)}`}</Typography>
						<div>
							<Typography variant="h4">{`${listState.filter((l) => l.isDone).length} / ${listState.length}`}</Typography>
						</div>
					</div>

					<div className={"topRow"}>
						<Typography variant="h4">{month}</Typography>
					</div>

					<div className={classes.addBar}>
						<Button onClick={() => setAddModalOpen(true)} variant="contained" color="primary" startIcon={<Add />}>
							ADD
						</Button>
					</div>
				</div>

				<div className={"bottom"}>
					<TodoList onRemove={onRemove} toggleDone={toggleDone} list={listState} />
				</div>
			</Container>

			{addModalOpen && <AddModal onAdd={onAdd} isOpen={addModalOpen} setIsOpen={setAddModalOpen} />}
		</>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}))

interface TodoListProps {
	list: TodoItem[]
	toggleDone: (t: TodoItem) => void
	onRemove: (t: TodoItem) => void
}
export const TodoList = (props: TodoListProps) => {
	const classes = useStyles()
	return (
		<List className={classes.root}>
			{props.list.map((t) => {
				return (
					<ListItem key={t.id} role={undefined} dense button onClick={() => props.toggleDone(t)}>
						<ListItemIcon>
							<Checkbox edge="start" checked={t.isDone} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": t.id }} />
						</ListItemIcon>
						<ListItemText style={{ textDecoration: t.isDone ? "line-through" : "" }} id={t.id} primary={`${t.title}`} />
						<ListItemSecondaryAction>
							<IconButton onClick={() => props.onRemove(t)} edge="end" aria-label="comments">
								<Delete />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				)
			})}
		</List>
	)
}

interface AddModalProps {
	isOpen: boolean
	setIsOpen: (b: boolean) => void
	onAdd: (t: TodoItem) => void
}

const AddModal = (props: AddModalProps) => {
	const [title, setTitle] = React.useState("")
	const useStyles = makeStyles({
		containter: {
			backgroundColor: "white",
			marginTop: "20px",
			padding: "20px",
			height: "60%",
		},
		top: {
			marginBottom: "20px",
		},
	})

	const {} = props
	const classes = useStyles()
	const { isOpen, setIsOpen } = props

	return (
		<Modal open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
			<Container className={classes.containter} maxWidth="sm">
				<form action="">
					<Container className={classes.top}>
						<Typography>Add New Todo</Typography>
						<TextField value={title} onChange={(e) => setTitle(e.currentTarget.value)} label="title" />
					</Container>

					<Container>
						<Button
							onClick={() => {
								// adds todo
								props.onAdd({ title, isDone: false, id: uuid() })

								// closes modal
								setIsOpen(false)
							}}
							variant="contained"
							color="primary"
							startIcon={<Add />}
						>
							ADD
						</Button>
					</Container>
				</form>
			</Container>
		</Modal>
	)
}
