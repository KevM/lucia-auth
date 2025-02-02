---
order: 0
layout: "@layouts/DocumentLayout.astro"
title: "Supabase"
---

An adapter for Supabase PostgreSQL database - can be used regardless of the Supabase version. **Make sure to enable row level security for all tables!**.

```ts
const adapter: (
	url: string,
	secret: string,
	errorHandler?: (error: PostgrestError) => void
) => Adapter;
```

### Parameter

`handleError()` may be provided which will be called on [unknown errors](/learn/basics/error-handling#known-errors) - database errors Lucia doesn't expect the adapter to catch. You can also throw custom errors inside it, which will be thrown when an unknown database error occurs inside [`Lucia`](/reference/api/server-api#lucia-default) methods.

| name        | type       | description                         | optional |
| ----------- | ---------- | ----------------------------------- | -------- |
| url         | `string`   | Supabase project url                |          |
| secret      | `string`   | `service_role` secret; NOT anon key |          |
| handleError | `Function` |                                     | true     |

### Errors

When an adapter encounters an unknown error (described above), it will throw `PostgrestError`.

## Installation

```bash
npm i @lucia-auth/adapter-supabase
pnpm add @lucia-auth/adapter-supabase
yarn add @lucia-auth/adapter-supabase
```

## Usage

```ts
import supabase from "@lucia-auth/adapter-supabase";

const auth = lucia({
	adapter: supabase(url, secret)
});
```

## Database structure

`uuid` should be changed to `varchar` if you use custom user ids.

### `user`

You may add additional columns to store user attributes. Refer to [Store user attributes](/learn/basics/store-user-attributes). `id` may be `varchar` if you generate your own user id.

| name            | type   | foreign constraint | default              | nullable | unique | identity |
| --------------- | ------ | ------------------ | -------------------- | -------- | ------ | -------- |
| id              | `uuid` |                    | `uuid_generate_v4()` |          | true   | true     |
| provider_id     | `text` |                    |                      |          | true   |          |
| hashed_password | `text` |                    |                      | true     |        |          |

### `session`

This is not required if you're only using the Supabase adapter for the `user` table via [`adapter.user`](/reference/configure/lucia-configurations#adapter) config.

| name         | type   | foreign constraint | nullable | unique | identity |
| ------------ | ------ | ------------------ | -------- | ------ | -------- |
| id           | `text` |                    |          | true   | true     |
| user_id      | `uuid` | `public.user(id)`  |          |        |          |
| expires      | `int8` |                    |          |        |          |
| idle_expires | `int8` |                    |          |        |          |

## Supabase SQL Editor

`UUID` in `user` table should be changed to `TEXT` if you use custom user ids.
You may add additional columns to store custom user data in `user` table. Refer to [Store user attributes](/learn/basics/store-user-attributes).

```sql
CREATE TABLE public.user (
	id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
	provider_id TEXT NOT NULL UNIQUE,
	hashed_password TEXT NULL
);

CREATE TABLE public.session (
  	id TEXT PRIMARY KEY,
	user_id UUID REFERENCES public.user(id),
	expires INT8 NOT NULL,
	idle_expires INT8 NOT NULL
);

ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.user IS '[Lucia] Users';
COMMENT ON TABLE public.session IS '[Lucia] User Sessions';
```
