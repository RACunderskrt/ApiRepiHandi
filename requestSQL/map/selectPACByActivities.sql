SELECT
    pac.id,
    pac.lastname,
    pac.firstname,
    pac.description,
    pac.birthdate,
    pac.clean,
    pac.mobility,
    pac.talk,
    pac.blind,
    pac.epilepsy,
    pac.deaf
FROM map_pac_activities
INNER JOIN pac ON map_pac_activities.id_pac = pac.id
WHERE id_activities = @@param1@@