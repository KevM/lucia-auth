--DROP TABLE IF EXISTS public.session;
--DROP TABLE IF EXISTS public.user;

CREATE TABLE public.user (
	id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
	provider_id TEXT NOT NULL UNIQUE,
	hashed_password TEXT NULL,
    username TEXT NOT NULL UNIQUE
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