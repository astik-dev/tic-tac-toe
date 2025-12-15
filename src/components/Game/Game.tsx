import { useState } from "react";
import Square, { type SquareProps } from "../Square/Square";
import ScoreCard from "../ScoreCard/ScoreCard";
import classes from "./Game.module.scss";

const PLAYER_COLORS = { X: "#48D2FE", O: "#E2BE00" } as const;

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
				<ScoreCard label="PLAYER X" color={PLAYER_COLORS.X} score={scores.X} />
				<ScoreCard label="DRAW" color="#BCDBF9" score={scores.draw} />
				<ScoreCard label="PLAYER O" color={PLAYER_COLORS.O} score={scores.O} />
			</div>

			<div className={classes.gridContainer}>

				<div className={classes.grid}>
					{grid.map((value, i) =>
						<Square
							key={i}
							value={value}
							color={PLAYER_COLORS[value || "X"]}
							onClick={() => handleSquareClick(i)}
							disabled={!isGameActive}
						/>
					)}
				</div>

				{isGameActive &&
					<div
						className={classes.turn}
						style={{ background: PLAYER_COLORS[player] }}
					>
						{player} turn
					</div>
				}

				{!isGameActive && (scores.X + scores.draw + scores.O) > 0 &&
					<div className={classes.banner}>Game over.</div>
				}

			</div>

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
