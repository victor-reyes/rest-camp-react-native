ALTER TABLE reviews
ADD CONSTRAINT unique_owner_id_rest_area_id_pair UNIQUE (owner_id, rest_area_id);