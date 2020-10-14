import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import Store from "./Store";

ReactDOM.render(
	<Provider store={new Store()}>
		<App />
	</Provider>,
	document.getElementById("root")
);
