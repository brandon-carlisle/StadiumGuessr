import { createFileRoute, redirect } from "@tanstack/react-router";
import SignUp from "@/components/sign-up";
import { getSessionFn } from "@/server-functions/auth";

export const Route = createFileRoute("/sign-up")({
	beforeLoad: async () => {
		const session = await getSessionFn();
		if (session?.user) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <SignUp />;
}
