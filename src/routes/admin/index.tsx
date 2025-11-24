import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkUserIsAdminFn } from "@/server-functions/auth";
import { getLeaguesFn } from "@/server-functions/leagues";
import { LeagueList } from "./-components/league-list";

export const Route = createFileRoute("/admin/")({
	beforeLoad: async () => {
		const isAdmin = await checkUserIsAdminFn();
		if (!isAdmin) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const {
		data: leagues,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["leagues"],
		queryFn: async () => await getLeaguesFn(),
		initialData: [],
	});

	if (isLoading) {
		return (
			<div className="container mx-auto p-6">
				<div className="flex items-center justify-center min-h-screen">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-6">
				<div className="alert alert-error">
					<span>Error loading leagues: {error.message}</span>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<p className="text-base-content/70 mt-2">Manage leagues and teams</p>
			</div>
			<LeagueList leagues={leagues || []} onRefetch={refetch} />
		</div>
	);
}
