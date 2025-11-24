import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "@/components/sign-in";
import { getSessionFn } from "@/server-functions/auth";

export const Route = createFileRoute("/sign-in")({
	beforeLoad: async () => {
		const session = await getSessionFn();

		console.log("session", session?.session);

		if (session?.user) {
			throw redirect({ to: "/" });
		}

		if (!session?.session) {
			throw redirect({ to: "/sign-up" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <SignIn />;
}
