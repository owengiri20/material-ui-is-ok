import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import { Container } from "@material-ui/core"
import { peeps } from "./data"

interface Column {
	id: "firstName" | "lastName" | "email" | "gender"
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}

const columns: Column[] = [
	{ id: "firstName", label: "First Name", minWidth: 100 },
	{ id: "lastName", label: "Last Name", minWidth: 100 },
]

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
})

export const PeopleList = () => {
	const classes = useStyles()
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{peeps.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
									{columns.map((column) => {
										const value = row[column.id]
										return (
											<TableCell key={column.id} align={column.align}>
												{column.format && typeof value === "number" ? column.format(value) : value}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={peeps.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}

export const Peoples = () => {
	return (
		<Container>
			<PeopleList />
		</Container>
	)
}
