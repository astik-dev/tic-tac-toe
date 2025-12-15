import { useEffect, useState } from "react";
import Square, { type SquareProps } from "../Square/Square";
import ScoreCard from "../ScoreCard/ScoreCard";
import classes from "./Game.module.scss";

const PLAYER_COLORS = { X: "#48D2FE", O: "#E2BE00" } as const;

const INITIAL_GRID = [
	null, null, null,
	null, null, null,
	null, null, null,
];

const WIN_LINES = [
	[ 0, 1, 2 ], // horizontal
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],

	[ 0, 3, 6 ], // vertical
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],

	[ 0, 4, 8 ], // diagonal
	[ 2, 4, 6 ],
];

function Game() {

	const [isGameActive, setIsGameActive] = useState(false);
	const [player, setPlayer] = useState<Exclude<SquareProps["value"], null>>("X");
	const [grid, setGrid] = useState<SquareProps["value"][]>(INITIAL_GRID);
	const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
	const [winner, setWinner] = useState<SquareProps["value"]>(null);

	const handleSquareClick = (squareIndex: number) => {
		setGrid(prev => {
			const newGrid = [...prev];
			newGrid[squareIndex] = player;
			return newGrid;
		});
		setPlayer(p => p === "X" ? "O" : "X");
	};

	useEffect(() => {

		let winner: SquareProps["value"] = null;

		for (const line of WIN_LINES) {
			const lineValues = line.map(index => grid[index]);
			winner = lineValues.reduce((accumulator, current) => {
				if (accumulator === current && current !== null) {
					return accumulator;
				} else {
					return null;
				}
			});
			if (winner) break;
		}

		if (winner) {
			setWinner(winner);
			setScores(s => ({ ...s, [winner]: s[winner] + 1 }));
			setIsGameActive(false);
		} else if (grid.every(v => v !== null)) {
			setScores(s => ({ ...s, draw: s.draw + 1 }));
			setIsGameActive(false);
		}

	}, [grid]);

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
					<div className={classes.banner}>
						Game over. {winner ? `Player ${winner} Wins!` : "It's a Draw!"}
					</div>
				}

			</div>

			{!isGameActive &&
				<button
					className={classes.newGameButton}
					onClick={() => { setIsGameActive(true); setGrid(INITIAL_GRID) }}
				>
					New Game
				</button>
			}

		</div>
	);
}

export default Game;
