import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { LeagueSelect } from "@/db/schema";
import { deleteLeagueFn } from "@/server-functions/leagues";
import { LeagueForm } from "./league-form";
import { TeamList } from "./team-list";

interface LeagueListProps {
	leagues: LeagueSelect[];
	onRefetch: () => void;
}

export function LeagueList({ leagues, onRefetch }: LeagueListProps) {
	const [expandedLeagues, setExpandedLeagues] = useState<Set<number>>(
		new Set(),
	);
	const [editingLeague, setEditingLeague] = useState<LeagueSelect | null>(null);
	const [showLeagueForm, setShowLeagueForm] = useState(false);
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			await deleteLeagueFn({ id });
		},
		onSuccess: () => {
			toast.success("League deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["leagues"] });
			onRefetch();
		},
		onError: (error: Error) => {
			toast.error(`Failed to delete league: ${error.message}`);
		},
	});

	const handleDelete = (league: LeagueSelect) => {
		if (
			confirm(
				`Are you sure you want to delete "${league.name}"? This will also delete all teams in this league.`,
			)
		) {
			deleteMutation.mutate(league.id.toString());
		}
	};

	const toggleLeague = (leagueId: number) => {
		setExpandedLeagues((prev) => {
			const next = new Set(prev);
			if (next.has(leagueId)) {
				next.delete(leagueId);
			} else {
				next.add(leagueId);
			}
			return next;
		});
	};

	const handleEdit = (league: LeagueSelect) => {
		setEditingLeague(league);
		setShowLeagueForm(true);
	};

	const handleAdd = () => {
		setEditingLeague(null);
		setShowLeagueForm(true);
	};

	const handleFormClose = () => {
		setShowLeagueForm(false);
		setEditingLeague(null);
	};

	return (
		<>
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="flex justify-between items-center mb-4">
						<h2 className="card-title text-2xl">Leagues</h2>
						<button className="btn btn-primary" onClick={handleAdd}>
							Add League
						</button>
					</div>

					{leagues.length === 0 ? (
						<div className="alert alert-info">
							<span>No leagues found. Create your first league!</span>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="table">
								<thead>
									<tr>
										<th>Code</th>
										<th>Name</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{leagues.map((league) => (
										<>
											<tr key={league.id}>
												<td>
													<button
														className="btn btn-ghost btn-sm"
														onClick={() => toggleLeague(league.id)}
													>
														{expandedLeagues.has(league.id) ? "▼" : "▶"}
													</button>
													<span className="font-mono font-semibold">
														{league.code}
													</span>
												</td>
												<td>{league.name}</td>
												<td>
													<div className="flex gap-2">
														<button
															className="btn btn-sm btn-warning"
															onClick={() => handleEdit(league)}
														>
															Edit
														</button>
														<button
															className="btn btn-sm btn-error"
															onClick={() => handleDelete(league)}
															disabled={deleteMutation.isPending}
														>
															{deleteMutation.isPending
																? "Deleting..."
																: "Delete"}
														</button>
													</div>
												</td>
											</tr>
											{expandedLeagues.has(league.id) && (
												<tr>
													<td colSpan={3}>
														<div className="pl-8 pt-4 pb-4">
															<TeamList league={league} />
														</div>
													</td>
												</tr>
											)}
										</>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{showLeagueForm && (
				<LeagueForm
					league={editingLeague}
					onClose={handleFormClose}
					onSuccess={() => {
						handleFormClose();
						queryClient.invalidateQueries({ queryKey: ["leagues"] });
						onRefetch();
					}}
				/>
			)}
		</>
	);
}
