DO $$
BEGIN
IF EXISTS (SELECT * FROM pac WHERE id = @@id@@) THEN
UPDATE pac

SET
    lastname = @@lastname@@,
    firstname = @@firstname@@,
    description = @@description@@,
    birthdate = @@birthdate@@,
    clean = @@clean@@,
    mobility = @@mobility@@,
    talk = @@talk@@,
    blind = @@blind@@,
    epilepsy = @@epilepsy@@,
    deaf = @@deaf@@

WHERE id = @@id@@;

ELSE

INSERT INTO  pac(
    lastname,
    firstname,
    description,
    birthdate,
    clean,
    mobility,
    talk,
    blind,
    epilepsy,
    deaf,
    id_user) 
VALUES (
    @@lastname@@,
    @@firstname@@,
    @@description@@,
    @@birthdate@@,
    @@clean@@,
    @@mobility@@,
    @@talk@@,
    @@blind@@,
    @@epilepsy@@,
    @@deaf@@,
    @@iduser@@);
END IF;
END $$;