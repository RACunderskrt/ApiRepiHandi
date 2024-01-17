DO $$
BEGIN
DELETE FROM public.map_pac_activities
	WHERE id_pac = @@param1@@;
DELETE FROM public.pac
	WHERE id = @@param1@@;
END $$;