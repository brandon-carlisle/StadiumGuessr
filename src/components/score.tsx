import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export function Score() {
	const score = useAppSelector((state) => state.game.score);
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (score === 0) {
			return;
		}

		setAnimate(true);
		const timer = setTimeout(() => {
			setAnimate(false);
		}, 600);

		return () => clearTimeout(timer);
	}, [score]);

	function getAnimationClass() {
		if (!animate) {
			return "";
		}

		return "motion-preset-bounce";
	}

	return (
		<>
			<div className="uppercase text-xs font-semibold">Score</div>
			<div
				className={`stat-value text-5xl text-primary-content ${getAnimationClass()} overflow-hidden`}
			>
				{score}
			</div>
		</>
	);
}
