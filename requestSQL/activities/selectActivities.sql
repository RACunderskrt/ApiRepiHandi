SELECT
    id,
    name,
    description,
    start,
    "end",
    id_user,
    capacity,
    address,
    postalcode
FROM
    activities
WHERE
    id = @@param1@@