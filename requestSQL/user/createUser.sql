DO $$
BEGIN
IF EXISTS (SELECT * FROM users WHERE id = @@id@@) THEN
UPDATE users

SET
    lastname = @@lastname@@,
    firstname = @@firstname@@,
    mail = @@mail@@,
    password = @@password@@,
    birthdate = @@birthdate@@,
    phone = @@phone@@,
    address = @@address@@,
    postalcode = @@postalcode@@

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
    @@birthdate@@,
    @@phone@@,
    @@address@@,
    @@postalcode@@);
END IF;
END $$;