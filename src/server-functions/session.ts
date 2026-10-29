import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export async function getServerSession() {
	const headers = getRequestHeaders();
	return auth.api.getSession({ headers });
}

export async function requireUser() {
	const session = await getServerSession();
	if (!session?.user) {
		throw new Error("You must be signed in");
	}
	return session;
}

export async function requireAdmin() {
	const session = await requireUser();
	if (session.user.role !== "admin") {
		throw new Error("Admin only");
	}
	return session;
}
