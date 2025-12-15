import classes from "./App.module.scss";
import Game from "./components/Game/Game";

function App() {
	return (
		<div className={classes.app}>
			<h1>tic.<br/><span>tac.</span><br/>toe.</h1>
			<Game/>
		</div>
	);
}

export default App;
