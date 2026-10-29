import { useEffect, useRef, useState } from "react";
import { gameDurationSeconds } from "@/lib/utils";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function Timer() {
	const dispatch = useAppDispatch();
	const { league, status, isPopupVisible } = useAppSelector(
		(state) => state.game,
	);
	const duration = gameDurationSeconds(league.teams.length);

	const [timeRemaining, setTimeRemaining] = useState(duration);
	const initialTimeRef = useRef<number>(duration);
	const prevStatusRef = useRef<string>("IDLE");
	const prevTimeRef = useRef(timeRemaining);

	// Reset timer when game status becomes IDLE, when transitioning to PLAYING, or when league changes
	useEffect(() => {
		if (league && league.teams.length > 0) {
			const initialTimeRemaining = gameDurationSeconds(league.teams.length);
			const prevStatus = prevStatusRef.current;

			// Reset timer when:
			// 1. Status is IDLE (game reset)
			// 2. Status transitions TO PLAYING (game starting - ensure clean state)
			// 3. League changes (new game)
			if (
				status === "IDLE" ||
				(status === "PLAYING" && prevStatus !== "PLAYING") ||
				initialTimeRef.current !== initialTimeRemaining
			) {
				initialTimeRef.current = initialTimeRemaining;
				setTimeRemaining(initialTimeRemaining);
			}

			prevStatusRef.current = status;
		}
	}, [status, league]);

	// Timer countdown and completion check
	useEffect(() => {
		let timer: ReturnType<typeof setInterval> | null = null;

		// Pause timer when popup is visible
		if (status === "PLAYING" && timeRemaining > 0 && !isPopupVisible) {
			timer = setInterval(() => {
				setTimeRemaining((prev) => prev - 1);
			}, 1000);
		}

		// Only mark as complete if:
		// 1. Status is PLAYING (game is actively running)
		// 2. Time remaining is 0 (timer has expired)
		// 3. Game was properly initialized (league.teams.length > 0)
		// 4. Timer was properly initialized (initialTimeRef.current matches expected initial time)
		// 5. Timer has actually counted down (timeRemaining reached 0 from a non-zero initial value)
		const expectedInitialTime =
			league && league.teams.length > 0
				? gameDurationSeconds(league.teams.length)
				: 0;

		if (
			status === "PLAYING" &&
			timeRemaining === 0 &&
			prevTimeRef.current > 0 &&
			league &&
			league.teams.length > 0 &&
			initialTimeRef.current === expectedInitialTime &&
			expectedInitialTime > 0
		) {
			// Counted down to zero during play. A fresh game can render 0 for one frame before the clock is set.
			dispatch(gameActions.setGameStatus("COMPLETE"));
		}

		prevTimeRef.current = timeRemaining;

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [timeRemaining, dispatch, status, isPopupVisible, league]);

	return <>{status === "IDLE" ? " " : timeRemaining}</>;
}
