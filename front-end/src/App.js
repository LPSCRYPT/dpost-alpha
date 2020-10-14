import React, { Fragment } from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import "./App.css";
import Title from "./components/Title";
import PostList from "./components/PostList";
import ConnectEthers from "./components/ConnectEthers";

const App = () => {
	return (
		<Fragment>
			<ThemeProvider>
				<CSSReset />
				<ConnectEthers />
				<Title />
				<PostList />
			</ThemeProvider>
		</Fragment>
	);
};

export default App;
