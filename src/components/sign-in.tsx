import { useForm } from "@tanstack/react-form";
import { signIn, useSession } from "@/lib/auth-client";

export default function SignIn() {
	const session = useSession();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						// Session will automatically update via Better Auth's reactive state
						form.reset();
					},
					onError: (ctx) => {
						// Error will be available via useSession().error
						console.error("Sign in error:", ctx.error);
					},
				},
			);
		},
	});

	const isLoading = session.isPending || form.state.isSubmitting;

	return (
		<div className="card bg-base-100 shadow-xl w-full max-w-md mx-auto">
			<div className="card-body">
				<h2 className="card-title">Sign In</h2>

				{session.error && (
					<div className="alert alert-error">
						<span>
							{session.error.message || "An error occurred during sign in"}
						</span>
					</div>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<form.Field
						name="email"
						validators={{
							onChange: ({ value }) =>
								!value
									? "Email is required"
									: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
										? "Please enter a valid email address"
										: undefined,
						}}
					>
						{(field) => (
							<div className="form-control w-full">
								<label className="label" htmlFor={field.name}>
									<span className="label-text">Email</span>
								</label>
								<input
									id={field.name}
									name={field.name}
									type="email"
									className="input input-bordered w-full"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									disabled={isLoading}
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
						name="password"
						validators={{
							onChange: ({ value }) =>
								!value
									? "Password is required"
									: value.length < 8
										? "Password must be at least 8 characters"
										: undefined,
						}}
					>
						{(field) => (
							<div className="form-control w-full">
								<label className="label" htmlFor={field.name}>
									<span className="label-text">Password</span>
								</label>
								<input
									id={field.name}
									name={field.name}
									type="password"
									className="input input-bordered w-full"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									disabled={isLoading}
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

					<form.Subscribe selector={(state) => state.canSubmit}>
						{(canSubmit) => (
							<div className="form-control mt-6">
								<button
									type="submit"
									className={`btn btn-primary ${isLoading ? "btn-loading" : ""}`}
									disabled={!canSubmit || isLoading}
								>
									{isLoading ? "Signing in..." : "Sign In"}
								</button>
							</div>
						)}
					</form.Subscribe>
				</form>
			</div>
		</div>
	);
}
