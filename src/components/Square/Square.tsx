import classes from "./Square.module.scss";

export type SquareProps = {
	value: "X" | "O" | null,
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