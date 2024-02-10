SELECT 
    id,
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
    id_user
FROM 
    pac
WHERE 
    id = @@param1@@