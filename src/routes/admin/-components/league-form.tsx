import { useForm } from "@tanstack/react-form";
import { toast } from "react-hot-toast";
import type { LeagueSelect } from "@/db/schema";
import { addLeagueFn, updateLeagueFn } from "@/server-functions/leagues";

interface LeagueFormProps {
	league: LeagueSelect | null;
	onClose: () => void;
	onSuccess: () => void;
}

export function LeagueForm({ league, onClose, onSuccess }: LeagueFormProps) {
	const isEditing = !!league;

	const form = useForm({
		defaultValues: {
			code: league?.code || "",
			name: league?.name || "",
		},
		onSubmit: async ({ value }) => {
			try {
				if (isEditing && league) {
					await updateLeagueFn({
						id: league.id.toString(),
						...value,
					});
					toast.success("League updated successfully");
				} else {
					await addLeagueFn(value);
					toast.success("League created successfully");
				}
				onSuccess();
			} catch (error) {
				toast.error(
					`Failed to ${isEditing ? "update" : "create"} league: ${
						error instanceof Error ? error.message : "Unknown error"
					}`,
				);
			}
		},
	});

	return (
		<dialog
			id={`league_modal_${league?.id || "new"}`}
			className="modal modal-open"
		>
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-4">
					{isEditing ? "Edit League" : "Add League"}
				</h3>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
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
							<div className="form-control w-full mb-4">
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
									placeholder="e.g., EPL"
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
						name="name"
						validators={{
							onChange: ({ value }) => {
								if (!value) {
									return "Name is required";
								}
								if (value.length < 2) {
									return "Name must be at least 2 characters";
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<div className="form-control w-full mb-4">
								<label className="label" htmlFor={field.name}>
									<span className="label-text">Name</span>
								</label>
								<input
									id={field.name}
									name={field.name}
									type="text"
									className="input input-bordered w-full"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder="e.g., English Premier League"
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
