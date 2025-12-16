import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import Game from "./components/Game/Game";

function App() {

	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		Promise.all([
			document.fonts.load('16px "Inter"'),
			document.fonts.load('16px "Fredoka"')
		]).then(() => setFontsLoaded(true));
	}, []);

	return fontsLoaded ? (
		<div className={classes.app}>
			<h1>tic.<br/><span>tac.</span><br/>toe.</h1>
			<Game/>
		</div>
	) : null;
}

export default App;
