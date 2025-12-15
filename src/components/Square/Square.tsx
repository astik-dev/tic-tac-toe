import type { Player } from "../Game/Game";
import classes from "./Square.module.scss";

type SquareProps = {
	value: Player | null,
	color: string,
	onClick: () => void,
	disabled: boolean,
};

function Square({ value, color, onClick, disabled }: SquareProps) {
	return (
		<button
			className={classes.square}
			style={{ color }}
			onClick={onClick}
			disabled={disabled || value !== null}
		>{value}</button>
	);
}

export default Square;