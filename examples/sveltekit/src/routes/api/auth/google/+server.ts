import { redirect } from '@sveltejs/kit';
import { auth, googleAuth } from "$lib/server/lucia";
import type { RequestHandler } from './$types';
 
export const GET: RequestHandler = async (event) => {

  const code = event.url.searchParams.get("code") || "";

  const { existingUser, createUser, providerUser } = await googleAuth.validateCallback(code);

  const user =
		existingUser ||
		(await createUser({
			username: providerUser.name
		}));

  const session = await auth.createSession(user.userId);
  event.locals.setSession(session);

  throw redirect(302, "/")
}