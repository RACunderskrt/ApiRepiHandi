DO $$
BEGIN
DELETE FROM public.map_pac_activities
	WHERE id_activities = @@param1@@;
DELETE FROM public.report
	WHERE id_activities = @@param1@@;
DELETE FROM public.activities
	WHERE id = @@param1@@;
END $$;