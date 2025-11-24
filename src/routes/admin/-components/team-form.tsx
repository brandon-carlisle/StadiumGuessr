import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { TeamSelect } from "@/db/schema";
import { getLeaguesFn } from "@/server-functions/leagues";
import { addTeamFn, updateTeamFn } from "@/server-functions/teams";

interface TeamFormProps {
	team: TeamSelect | null;
	leagueId: number;
	onClose: () => void;
	onSuccess: () => void;
}

export function TeamForm({
	team,
	leagueId,
	onClose,
	onSuccess,
}: TeamFormProps) {
	const isEditing = !!team;

	const { data: leagues } = useQuery({
		queryKey: ["leagues"],
		queryFn: async () => await getLeaguesFn(),
		initialData: [],
	});

	const form = useForm({
		defaultValues: {
			code: team?.code || "",
			clubName: team?.clubName || "",
			stadiumName: team?.stadiumName || "",
			latitude: team?.latitude?.toString() || "",
			longitude: team?.longitude?.toString() || "",
			leagueId: team?.leagueId || leagueId,
		},
		onSubmit: async ({ value }) => {
			try {
				const teamData = {
					code: value.code,
					clubName: value.clubName,
					stadiumName: value.stadiumName,
					latitude: parseFloat(value.latitude),
					longitude: parseFloat(value.longitude),
					leagueId: value.leagueId,
				};

				if (isEditing && team) {
					await updateTeamFn({
						id: team.id.toString(),
						...teamData,
					});
					toast.success("Team updated successfully");
				} else {
					await addTeamFn(teamData);
					toast.success("Team created successfully");
				}
				onSuccess();
			} catch (error) {
				toast.error(
					`Failed to ${isEditing ? "update" : "create"} team: ${
						error instanceof Error ? error.message : "Unknown error"
					}`,
				);
			}
		},
	});

	return (
		<dialog id={`team_modal_${team?.id || "new"}`} className="modal modal-open">
			<div className="modal-box max-w-2xl">
				<h3 className="font-bold text-lg mb-4">
					{isEditing ? "Edit Team" : "Add Team"}
				</h3>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<form.Field
							name="code"
							validators={{
								onChange: ({ value }) => {
									if (!value) {
										return "Code is required";
									}
									if (value.length < 2) {
										return "Code must be at least 2 characters";
									}
									if (!/^[A-Z0-9]+$/.test(value)) {
										return "Code must contain only uppercase letters and numbers";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="form-control w-full">
									<label className="label" htmlFor={field.name}>
										<span className="label-text">Code</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type="text"
										className="input input-bordered w-full"
										value={field.state.value}
										onChange={(e) =>
											field.handleChange(e.target.value.toUpperCase())
										}
										onBlur={field.handleBlur}
										disabled={isEditing}
										placeholder="e.g., ARS"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="label">
											<span className="label-text-alt text-error">
												{field.state.meta.errors[0]}
											</span>
										</div>
									)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="leagueId"
							validators={{
								onChange: ({ value }) => {
									if (!value || value <= 0) {
										return "League is required";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="form-control w-full">
									<label className="label" htmlFor={field.name}>
										<span className="label-text">League</span>
									</label>
									<select
										id={field.name}
										name={field.name}
										className="select select-bordered w-full"
										value={field.state.value}
										onChange={(e) =>
											field.handleChange(parseInt(e.target.value, 10))
										}
										onBlur={field.handleBlur}
									>
										<option value="">Select a league</option>
										{leagues?.map((league) => (
											<option key={league.id} value={league.id}>
												{league.name} ({league.code})
											</option>
										))}
									</select>
									{field.state.meta.errors.length > 0 && (
										<div className="label">
											<span className="label-text-alt text-error">
												{field.state.meta.errors[0]}
											</span>
										</div>
									)}
								</div>
							)}
						</form.Field>
					</div>

					<form.Field
						name="clubName"
						validators={{
							onChange: ({ value }) => {
								if (!value) {
									return "Club name is required";
								}
								if (value.length < 2) {
									return "Club name must be at least 2 characters";
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<div className="form-control w-full mb-4">
								<label className="label" htmlFor={field.name}>
									<span className="label-text">Club Name</span>
								</label>
								<input
									id={field.name}
									name={field.name}
									type="text"
									className="input input-bordered w-full"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder="e.g., Arsenal"
								/>
								{field.state.meta.errors.length > 0 && (
									<div className="label">
										<span className="label-text-alt text-error">
											{field.state.meta.errors[0]}
										</span>
									</div>
								)}
							</div>
						)}
					</form.Field>

					<form.Field
						name="stadiumName"
						validators={{
							onChange: ({ value }) => {
								if (!value) {
									return "Stadium name is required";
								}
								if (value.length < 2) {
									return "Stadium name must be at least 2 characters";
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<div className="form-control w-full mb-4">
								<label className="label" htmlFor={field.name}>
									<span className="label-text">Stadium Name</span>
								</label>
								<input
									id={field.name}
									name={field.name}
									type="text"
									className="input input-bordered w-full"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder="e.g., Emirates Stadium"
								/>
								{field.state.meta.errors.length > 0 && (
									<div className="label">
										<span className="label-text-alt text-error">
											{field.state.meta.errors[0]}
										</span>
									</div>
								)}
							</div>
						)}
					</form.Field>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<form.Field
							name="latitude"
							validators={{
								onChange: ({ value }) => {
									if (!value) {
										return "Latitude is required";
									}
									const num = parseFloat(value);
									if (isNaN(num)) {
										return "Latitude must be a valid number";
									}
									if (num < -90 || num > 90) {
										return "Latitude must be between -90 and 90";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="form-control w-full">
									<label className="label" htmlFor={field.name}>
										<span className="label-text">Latitude</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type="number"
										step="any"
										className="input input-bordered w-full"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="e.g., 51.556667"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="label">
											<span className="label-text-alt text-error">
												{field.state.meta.errors[0]}
											</span>
										</div>
									)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="longitude"
							validators={{
								onChange: ({ value }) => {
									if (!value) {
										return "Longitude is required";
									}
									const num = parseFloat(value);
									if (isNaN(num)) {
										return "Longitude must be a valid number";
									}
									if (num < -180 || num > 180) {
										return "Longitude must be between -180 and 180";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="form-control w-full">
									<label className="label" htmlFor={field.name}>
										<span className="label-text">Longitude</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type="number"
										step="any"
										className="input input-bordered w-full"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="e.g., -0.106111"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="label">
											<span className="label-text-alt text-error">
												{field.state.meta.errors[0]}
											</span>
										</div>
									)}
								</div>
							)}
						</form.Field>
					</div>

					<div className="modal-action">
						<form method="dialog">
							<button
								type="button"
								className="btn btn-ghost mr-2"
								onClick={onClose}
							>
								Cancel
							</button>
						</form>
						<form.Subscribe selector={(state) => state.canSubmit}>
							{(canSubmit) => (
								<button
									type="submit"
									className="btn btn-primary"
									disabled={!canSubmit || form.state.isSubmitting}
								>
									{form.state.isSubmitting
										? "Saving..."
										: isEditing
											? "Update"
											: "Create"}
								</button>
							)}
						</form.Subscribe>
					</div>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button onClick={onClose}>close</button>
			</form>
		</dialog>
	);
}
