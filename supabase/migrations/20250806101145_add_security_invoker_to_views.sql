BEGIN;

-- Photos view
ALTER VIEW v1.photos
SET (security_invoker = true);

-- Profiles view
ALTER VIEW v1.profiles
SET (security_invoker = true);

-- Rest areas view
ALTER VIEW v1.rest_areas
SET (security_invoker = true);

-- Services view
ALTER VIEW v1.services
SET (security_invoker = true);

-- Rest areas with services view
ALTER VIEW v1.rest_areas_with_services
SET (security_invoker = true);

-- Reviews view
ALTER VIEW v1.reviews
SET (security_invoker = true);

COMMIT;