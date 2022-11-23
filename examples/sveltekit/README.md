# Lucia + Sveltekit demo

## Setup

```bash
pnpm i
pnpm dev
```

### Database

Add a `username` column to `user` table (string, unique).
Add a 'roles' column to the 'user' table (string, not null).

### Google OAuth Client Id and Secret

You'll need to obtain a [Google OAuth authorization credentials](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred). 
* If you do not already have one [create a Google Cloud Project](https://console.cloud.google.com/projectcreate).
* Once you've selected a project. Click on **+ Create Credentials -> OAuth client ID**
  * Select `Web application`
  * Give it a `Name`.
  * Set `Authorized JavaScript origins` to the root of your local dev server. `http://localhost:5173`
  * Set `Authorized redirect URIs` to `http://localhost:5173/api/auth/google`
  * Click Create. 
  * Copy the Client ID, and Client Secret to your .env file.

#### `$lib/server/Lucia.ts`

You will need the `redirectUri` to be correct in `/src/lib/server/lucia.ts` for your development server.

### Environment variables

You can create a `.env` file at the root of your project or use your OS environment.

```bash
SUPABASE_URL=""
SUPABASE_SECRET="" # service_role
GOOGLE_CLIENT_ID="****.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="****-secret"
```



