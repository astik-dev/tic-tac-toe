import { useState } from "react";
import Square, { type SquareProps } from "../Square/Square";
import ScoreCard from "../ScoreCard/ScoreCard";
import classes from "./Game.module.scss";

const PLAYER_X_COLOR = "#48D2FE";
const PLAYER_O_COLOR = "#E2BE00";

const INITIAL_GRID = [
	null, null, null,
	null, null, null,
	null, null, null,
];

function Game() {

	const [isGameActive, setIsGameActive] = useState(false);
	const [player, setPlayer] = useState<Exclude<SquareProps["value"], null>>("X");
	const [grid, setGrid] = useState<SquareProps["value"][]>(INITIAL_GRID);
	const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

	const handleSquareClick = (squareIndex: number) => {
		setGrid(prev => {
			const newGrid = [...prev];
			newGrid[squareIndex] = player;
			return newGrid;
		});
		setPlayer(p => p === "X" ? "O" : "X");
	};

	return (
		<div className={classes.game}>

			<div className={classes.scores}>
				<ScoreCard label="PLAYER X" color={PLAYER_X_COLOR} score={scores.X} />
				<ScoreCard label="DRAW" color="#BCDBF9" score={scores.draw} />
				<ScoreCard label="PLAYER O" color={PLAYER_O_COLOR} score={scores.O} />
			</div>

			<div className={classes.grid}>
				{grid.map((value, i) =>
					<Square
						key={i}
						value={value}
						color={value === "X" ? PLAYER_X_COLOR : PLAYER_O_COLOR}
						onClick={() => handleSquareClick(i)}
						disabled={!isGameActive}
					/>
				)}
			</div>

			{isGameActive &&
				<div
					className={classes.turn}
					style={{
						background: player === "X" ? PLAYER_X_COLOR : PLAYER_O_COLOR
					}}
				>
					{player} turn
				</div>
			}

			{!isGameActive && (scores.X + scores.draw + scores.O) > 0 &&
				<div className={classes.banner}>Game over.</div>
			}

			{!isGameActive &&
				<button
					className={classes.newGameButton}
					onClick={() => setIsGameActive(true)}
				>
					New Game
				</button>
			}

		</div>
	);
}

export default Game;
