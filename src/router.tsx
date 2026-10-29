import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import type { ReactNode } from "react";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

let queryContext: ReturnType<typeof TanstackQuery.getContext>;

function QueryWrap({ children }: { children: ReactNode }) {
	return (
		<TanstackQuery.Provider {...queryContext}>
			{children}
		</TanstackQuery.Provider>
	);
}

// Create a new router instance
export const getRouter = () => {
	queryContext = TanstackQuery.getContext();
	const rqContext = queryContext;

	const router = createRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: "intent",
		Wrap: QueryWrap,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
