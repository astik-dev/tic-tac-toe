import { useState } from "react";
import Square from "../Square/Square";
import ScoreCard from "../ScoreCard/ScoreCard";
import { motion, AnimatePresence } from "motion/react"
import classes from "./Game.module.scss";

export type Player = "X" | "O";

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

function calculateWinner(grid: (Player | null)[]): Player | null {

	let winner: Player | null = null;

	for (const line of WIN_LINES) {
		const lineValues = line.map(index => grid[index]);
		winner = lineValues.reduce((accumulator, current) => {
			return accumulator === current && current !== null ? accumulator : null;
		});
		if (winner) break;
	}

	return winner;
}

function Game() {

	const [isGameActive, setIsGameActive] = useState(false);
	const [player, setPlayer] = useState<Player>("X");
	const [grid, setGrid] = useState<(Player | null)[]>(INITIAL_GRID);
	const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
	const [winner, setWinner] = useState<Player | null>(null);

	const handleSquareClick = (squareIndex: number) => {
		
		const newGrid = [...grid];
		newGrid[squareIndex] = player;

		setGrid(newGrid);
		setPlayer(p => p === "X" ? "O" : "X");

		const winner = calculateWinner(newGrid);
		setWinner(winner);

		if (winner || newGrid.every(v => v !== null)) {
			const scoresKey = winner || "draw";
			setScores(s => ({ ...s, [scoresKey]: s[scoresKey] + 1 }));
			setIsGameActive(false);
		}
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

				<AnimatePresence mode="wait">

					{isGameActive &&
						<motion.div
							key="turn"
							className={classes.turn}
							style={{ background: PLAYER_COLORS[player] }}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
						>
							{player} turn
						</motion.div>
					}

					{!isGameActive && (scores.X + scores.draw + scores.O) > 0 &&
						<motion.div
							key="banner"
							className={classes.banner}
							initial={{ scale: 0, y: 20, opacity: 0 }}
							animate={{ scale: 1, y: 0, opacity: 1 }}
							exit={{ scale: 0, y: -20, opacity: 0 }}
						>
							<div>
								Game over. {winner ? `Player ${winner} Wins!` : "It's a Draw!"}
							</div>
						</motion.div>
					}

				</AnimatePresence>

			</div>

			<AnimatePresence>

				{!isGameActive &&
					<motion.button
						key="new-game"
						className={classes.newGameButton}
						onClick={
							() => { setIsGameActive(true); setGrid(INITIAL_GRID) }
						}
						initial={{ y: 110, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 110, opacity: 0 }}
						whileHover={{ background: "#C5A0D7" }}
						transition={{ ease: "easeIn" }}
					>
						New Game
					</motion.button>
				}
				
			</AnimatePresence>

		</div>
	);
}

export default Game;
