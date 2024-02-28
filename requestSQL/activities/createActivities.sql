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
    postalcode = @@postalcode@@,
    request = @@request@@

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
    postalcode,
    request
) 
VALUES (
    @@name@@,
    @@description@@,
    @@start@@,
    @@end@@,
    @@id_user@@,
    @@capacity@@,
    @@address@@,
    @@postalcode@@,
    @@request@@);
END IF;
END $$;