import { useAppSelector } from "@/store/hooks";
import { Score } from "./score";
import { Timer } from "./timer";

export function GameInfo() {
	const { teamsRemaining } = useAppSelector((state) => state.game);

	return (
		<div className="card card-normal border bg-primary">
			<div className="card-body">
				<div className="flex justify-evenly md:flex-col gap-3">
					<div className="border-b-2 border-primary-content/10 pb-4">
						<Score />
					</div>

					<div className="border-b-2 border-primary-content/10 pb-4">
						<div className="uppercase text-xs font-semibold">Teams Left</div>
						<div className="stat-value text-5xl text-primary-content">
							{teamsRemaining}
						</div>
					</div>

					<div className="pb-4">
						<div className="uppercase text-xs font-semibold">Time</div>
						<div className="stat-value text-5xl text-primary-content">
							<Timer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
