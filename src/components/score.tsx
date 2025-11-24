import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

// TODO: Change animation based
// on score increasing or decreasing

export function Score() {
	const score = useAppSelector((state) => state.game.score);
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (!animate) {
			setAnimate(true);
			timer = setTimeout(() => {
				setAnimate(false);
			}, 600); // reset animate class after 600ms
		}

		return () => clearTimeout(timer);
	}, [animate]);

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
