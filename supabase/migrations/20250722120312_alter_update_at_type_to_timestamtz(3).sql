BEGIN; 

DROP VIEW IF EXISTS v1.photos;

ALTER TABLE photos
ALTER COLUMN updated_at TYPE timestamptz(3)
USING updated_at::timestamptz(3);

ALTER TABLE photos
ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP(3);

CREATE VIEW v1.photos AS
SELECT 
  url,
  thumbnail_url,
  description,
  rest_area_id,
  review_id,
  owner_id,
  updated_at,
  deleted
FROM photos;


DROP VIEW IF EXISTS v1.profiles;

ALTER TABLE profiles
ALTER COLUMN updated_at TYPE timestamptz(3)
USING updated_at::timestamptz(3);

ALTER TABLE profiles
ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP(3);

CREATE VIEW v1.profiles AS
SELECT id,
    updated_at,
    username,
    full_name,
    avatar_url,
    location
   FROM profiles;



DROP VIEW IF EXISTS v1.rest_areas;
DROP VIEW IF EXISTS v1.services;
DROP VIEW IF EXISTS v1.rest_areas_with_services;

ALTER TABLE rest_areas
ALTER COLUMN updated_at TYPE timestamptz(3)
USING updated_at::timestamptz(3);

ALTER TABLE rest_areas
ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP(3);


ALTER TABLE services
ALTER COLUMN updated_at TYPE timestamptz(3)
USING updated_at::timestamptz(3);

ALTER TABLE services
ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP(3);


CREATE VIEW v1.rest_areas AS
 SELECT id,
    name,
    latitude,
    longitude,
    description,
    local_description,
    status,
    updated_at,
    deleted
   FROM rest_areas;

CREATE VIEW v1.services AS
 SELECT id,
    name,
    rest_area_id,
    deleted,
    updated_at
   FROM services;

CREATE VIEW v1.rest_areas_with_services AS
 SELECT ra.id,
    ra.updated_at,
    ra.name,
    ra.latitude,
    ra.longitude,
    ra.description,
    ra.local_description,
    ra.status,
    ra.trafikverket_id,
    ra.deleted,
    json_agg(s.*) AS services
   FROM (rest_areas ra
     LEFT JOIN services s ON ((ra.id = s.rest_area_id)))
  GROUP BY ra.id;


DROP VIEW IF EXISTS v1.reviews;

ALTER TABLE reviews
ALTER COLUMN updated_at TYPE timestamptz(3)
USING updated_at::timestamptz(3);

ALTER TABLE reviews
ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP(3);


CREATE VIEW v1.reviews AS
 SELECT id,
    owner_id,
    recension,
    score,
    rest_area_id,
    updated_at,
    deleted
   FROM reviews;


COMMIT;