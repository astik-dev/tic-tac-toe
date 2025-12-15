import classes from "./ScoreCard.module.scss";

type ScoreCardProps = {
	label: string,
	score: number,
	color: string,
}

function ScoreCard({ label, score, color }: ScoreCardProps) {
	return (
		<div className={classes.scoreCard} style={{ background: color }}>
			<span className={classes.label}>{label}</span>
			<span className={classes.score}>{score}</span>
		</div>
	);
}

export default ScoreCard;