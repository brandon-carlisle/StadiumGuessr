import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { LeagueSelect, TeamSelect } from "@/db/schema";
import { deleteTeamFn, getTeamsForLeagueFn } from "@/server-functions/teams";
import { TeamForm } from "./team-form";

interface TeamListProps {
	league: LeagueSelect;
}

export function TeamList({ league }: TeamListProps) {
	const [editingTeam, setEditingTeam] = useState<TeamSelect | null>(null);
	const [showTeamForm, setShowTeamForm] = useState(false);
	const queryClient = useQueryClient();

	const {
		data: teams,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["teams", league.code],
		queryFn: async () =>
			await getTeamsForLeagueFn({ data: { leagueId: league.id } }),
		initialData: [],
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: number) => {
			await deleteTeamFn({ data: { id } });
		},
		onSuccess: () => {
			toast.success("Team deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["teams", league.code] });
			refetch();
		},
		onError: (error: Error) => {
			toast.error(`Failed to delete team: ${error.message}`);
		},
	});

	const handleDelete = (team: TeamSelect) => {
		if (confirm(`Are you sure you want to delete "${team.clubName}"?`)) {
			deleteMutation.mutate(team.id);
		}
	};

	const handleEdit = (team: TeamSelect) => {
		setEditingTeam(team);
		setShowTeamForm(true);
	};

	const handleAdd = () => {
		setEditingTeam(null);
		setShowTeamForm(true);
	};

	const handleFormClose = () => {
		setShowTeamForm(false);
		setEditingTeam(null);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-4">
				<span className="loading loading-spinner loading-md"></span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="alert alert-error">
				<span>Error loading teams: {error.message}</span>
			</div>
		);
	}

	return (
		<>
			<div className="card bg-base-200 shadow-md">
				<div className="card-body">
					<div className="flex justify-between items-center mb-4">
						<h3 className="card-title text-lg">Teams ({teams?.length || 0})</h3>
						<button
							className="btn btn-sm btn-primary"
							type="button"
							onClick={(e) => {
								e.preventDefault();
								handleAdd();
							}}
						>
							Add Team
						</button>
					</div>

					{!teams || teams.length === 0 ? (
						<div className="alert alert-info">
							<span>No teams found. Add your first team!</span>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="table table-sm">
								<thead>
									<tr>
										<th>Code</th>
										<th>Club Name</th>
										<th>Stadium</th>
										<th>Coordinates</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{teams.map((team) => (
										<tr key={team.id}>
											<td>
												<span className="font-mono font-semibold">
													{team.code}
												</span>
											</td>
											<td>{team.clubName}</td>
											<td>{team.stadiumName}</td>
											<td>
												<span className="text-xs font-mono">
													{team.latitude.toFixed(6)},{" "}
													{team.longitude.toFixed(6)}
												</span>
											</td>
											<td>
												<div className="flex gap-2">
													<button
														className="btn btn-xs btn-warning"
														type="button"
														onClick={(e) => {
															e.preventDefault();
															handleEdit(team);
														}}
													>
														Edit
													</button>
													<button
														className="btn btn-xs btn-error"
														type="button"
														onClick={(e) => {
															e.preventDefault();
															handleDelete(team);
														}}
														disabled={deleteMutation.isPending}
													>
														{deleteMutation.isPending
															? "Deleting..."
															: "Delete"}
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{showTeamForm && (
				<TeamForm
					team={editingTeam}
					leagueId={league.id}
					onClose={handleFormClose}
					onSuccess={() => {
						handleFormClose();
						queryClient.invalidateQueries({ queryKey: ["teams", league.code] });
						refetch();
					}}
				/>
			)}
		</>
	);
}
