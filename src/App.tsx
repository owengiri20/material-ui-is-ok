import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import { AppWrapper } from "./common/appWrapper"
import { Home } from "./common/pages/home"
import { Peoples } from "./peoples/peoples"
import { Todo } from "./todo/todo"
import { TyperWrapper as Typer } from "./typing-game/typer"

const theme = createMuiTheme({
	palette: {},
})
function App() {
	return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<Container maxWidth={"xl"} style={{ marginTop: "20px" }}>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/todo" component={Todo} exact />
						<Route path="/peoples" component={Peoples} exact />
						<Route path="/typer" component={Typer} exact />
					</Switch>
				</Container>
			</AppWrapper>
		</ThemeProvider>
	)
}

export default App
