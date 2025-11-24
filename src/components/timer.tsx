import { useEffect, useState } from "react";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const baseGuessTimePerTeam = 5; // seconds per team

export function Timer() {
	const dispatch = useAppDispatch();
	const { league, status, isPopupVisible } = useAppSelector(
		(state) => state.game,
	);

	const [timeRemaining, setTimeRemaining] = useState(60);

	useEffect(() => {
		const initialTimeRemaining = baseGuessTimePerTeam * league.teams.length;
		setTimeRemaining(initialTimeRemaining);
	}, [league]);

	useEffect(() => {
		let timer: ReturnType<typeof setInterval> | null = null;

		// Pause timer when popup is visible
		if (status === "PLAYING" && timeRemaining > 0 && !isPopupVisible) {
			timer = setInterval(() => {
				setTimeRemaining((prev) => prev - 1);
			}, 1000);
		}

		if (status === "PLAYING" && timeRemaining === 0) {
			dispatch(gameActions.setGameStatus("COMPLETE"));
		}

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [timeRemaining, dispatch, status, isPopupVisible]);

	return <>{status === "IDLE" ? " " : timeRemaining}</>;
}
