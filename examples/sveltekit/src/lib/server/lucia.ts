import lucia from 'lucia-auth';
import supabase from '@lucia-auth/adapter-supabase';
import { dev } from '$app/environment';
import { SUPABASE_URL, SUPABASE_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import google from "@lucia-auth/oauth/google";

export const auth = lucia({
	adapter: supabase(SUPABASE_URL, SUPABASE_SECRET),
	env: dev ? 'DEV' : 'PROD',
	sessionTimeout: 1000 * 5,
	transformUserData: (userData) => {
		const roles = userData.roles.split(',');
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID || "",
	clientSecret: GOOGLE_CLIENT_SECRET || "",
	redirectUri: "http://localhost:5173/api/auth/google"
});

export type Auth = typeof auth;

