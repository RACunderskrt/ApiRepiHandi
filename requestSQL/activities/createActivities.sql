DO $$
BEGIN
IF EXISTS (SELECT * FROM activities WHERE id = @@id@@) THEN
UPDATE activities

SET 
    name = @@name@@, 
    description = @@description@@, 
    start = @@start@@, 
    "end" = @@end@@, 
    id_user = @@id_user@@, 
    capacity = @@capacity@@, 
    address = @@address@@, 
    postalcode = @@postalcode@@

WHERE id = @@id@@;

ELSE

INSERT INTO  activities(
    name,
    description,
    start,
    "end",
    id_user,
    capacity,
    address,
    postalcode
) 
VALUES (
    @@name@@,
    @@description@@,
    @@start@@,
    @@end@@,
    @@id_user@@,
    @@capacity@@,
    @@address@@,
    @@postalcode@@);
END IF;
END $$;