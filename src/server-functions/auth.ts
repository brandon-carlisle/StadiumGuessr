import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { auth } from "@/lib/auth";

// Sign in schema
const signInSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean().optional(),
	callbackURL: z.string().url().optional().or(z.literal("")),
});

// Sign up schema
const signUpSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	name: z.string().min(2, "Name must be at least 2 characters"),
	image: z.url().optional().or(z.literal("")),
	callbackURL: z.url().optional().or(z.literal("")),
});

// Sign in with email and password
export const signInFn = createServerFn({
	method: "POST",
})
	.inputValidator(signInSchema)
	.handler(async ({ data }) => {
		const headers = getRequestHeaders();
		const result = await auth.api.signInEmail({
			body: {
				email: data.email,
				password: data.password,
				rememberMe: data.rememberMe,
				callbackURL: data.callbackURL,
			},
			headers,
		});

		return result;
	});

// Sign up with email and password
export const signUpFn = createServerFn({
	method: "POST",
})
	.inputValidator(signUpSchema)
	.handler(async ({ data }) => {
		const headers = getRequestHeaders();
		const result = await auth.api.signUpEmail({
			body: {
				email: data.email,
				password: data.password,
				name: data.name,
				image: data.image,
				callbackURL: data.callbackURL,
			},
			headers,
		});

		return result;
	});

// Get current session
export const getSessionFn = createServerFn({
	method: "GET",
}).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	return session;
});

// Sign out current user
export const signOutFn = createServerFn({
	method: "POST",
}).handler(async () => {
	const headers = getRequestHeaders();
	const result = await auth.api.signOut({
		headers,
	});

	return result;
});

// Check if current user is an admin
export const checkUserIsAdminFn = createServerFn({
	method: "GET",
}).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	return session?.user?.role === "admin";
});
