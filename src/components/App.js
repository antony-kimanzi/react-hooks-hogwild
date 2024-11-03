import React from "react";
import Nav from "./Nav";
import HogCard from "./HogCard";

import hogs from "../porkers_data";

function App() {
	return (
		<div className="App">
			<Nav />
			<HogCard hogs={hogs} />
		</div>
	);
}

export default App;
