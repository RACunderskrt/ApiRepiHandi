SELECT
    activities.id,
    activities.name,
    activities.description,
    activities.start,
    activities.end,
    activities.id_user,
    activities.capacity,
    activities.address,
    activities.postalcode
FROM map_pac_activities
INNER JOIN activities ON map_pac_activities.id_activities = activities.id
WHERE id_pac = @@param1@@ and activities.start >= now();