import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "@/components/sign-in";
import { getSessionFn } from "@/server-functions/auth";

export const Route = createFileRoute("/sign-in")({
	beforeLoad: async () => {
		const session = await getSessionFn();

		if (session?.user) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <SignIn />;
}
