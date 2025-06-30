--==============================================================
--  MIGRATION  : add surrogate PKs to photos & services,
--               add deleted + updated_at to services
--               copy rest_areas.updated_at into services
--==============================================================
BEGIN;

/*----------------------------------------------------------------
  PHOTOS
----------------------------------------------------------------*/
-- 1a. Add surrogate primary key column
ALTER TABLE photos
    ADD COLUMN IF NOT EXISTS id uuid
    NOT NULL
    DEFAULT gen_random_uuid();

-- 1b. Drop any existing PK that might be there (harmless if not)
ALTER TABLE photos
    DROP CONSTRAINT IF EXISTS photos_pkey;

-- 1c. Declare the new primary key
ALTER TABLE photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


/*----------------------------------------------------------------
  SERVICES
----------------------------------------------------------------*/
-- 2a. Add surrogate primary key column
ALTER TABLE services
    ADD COLUMN IF NOT EXISTS id uuid
    NOT NULL
    DEFAULT gen_random_uuid();

-- 2b. Drop any old primary key
ALTER TABLE services
    DROP CONSTRAINT IF EXISTS services_pkey;

-- 2c. Set the new primary key
ALTER TABLE services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);

-- 3. Add “deleted” flag (photos already has one)
ALTER TABLE services
    ADD COLUMN IF NOT EXISTS deleted boolean
    NOT NULL
    DEFAULT false;

-- 4. Add “updated_at” column.
--    We add it NULLABLE first so we can back-fill, then make it NOT NULL.
ALTER TABLE services
    ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone;

-- 4a. Back-fill from the parent rest_area
UPDATE services AS s
SET    updated_at = r.updated_at
FROM   rest_areas AS r
WHERE  s.rest_area_id = r.id
  AND  s.updated_at IS NULL;   -- don’t clobber data if you re-run

-- 4b. Enforce NOT NULL + default for future inserts
ALTER TABLE services
    ALTER COLUMN updated_at SET NOT NULL,
    ALTER COLUMN updated_at SET DEFAULT (now() AT TIME ZONE 'utc');

COMMIT;
