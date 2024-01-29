DO $$
BEGIN
IF EXISTS (SELECT * FROM report WHERE id = @@id@@) THEN
UPDATE report

SET 
    done = @@done@@
WHERE id = @@id@@;

ELSE

INSERT INTO  report(
    id_activities,
    id_user
) 
VALUES (
    @@id_activities@@,
    @@id_user@@
);
END IF;
END $$;