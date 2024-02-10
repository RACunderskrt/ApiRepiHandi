DO $$
BEGIN
IF EXISTS (SELECT * FROM users WHERE id = @@id@@) THEN
UPDATE users

SET
    lastname = @@lastname@@,
    firstname = @@firstname@@,
    mail = @@mail@@,
    password = @@password@@,
    birthdate = DATE @@birthdate@@ + INTEGER '1',
    phone = @@phone@@,
    address = @@address@@,
    postalcode = @@postalcode@@,
    id_role = @@id_role@@

WHERE id = @@id@@;

ELSE

INSERT INTO  users(
    lastname,
    firstname,
    mail,
    password,
    birthdate,
    phone,
    address,
    postalcode) 
VALUES (
    @@lastname@@,
    @@firstname@@,
    @@mail@@,
    @@password@@,
    DATE @@birthdate@@ + INTEGER '1',
    @@phone@@,
    @@address@@,
    @@postalcode@@);
END IF;
END $$;