// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from "./meta/_journal.json";
import m0000 from "./0000_init.sql";
import m0001 from "./0001_add_update_at_column.sql";
import m0002 from "./0002_add_thubnail_url_column_to_photos_table.sql";
import m0003 from "./0003_remove_foreign_key_constraints.sql";
import m0004 from "./0004_add_deleted_column.sql";
import m0005 from "./0005_add_reviews_table.sql";
import m0006 from "./0006_add_id_primary_to_services_table.sql";
import m0007 from "./0007_add_profiles_table.sql";

export default {
  journal,
  migrations: {
    m0000,
    m0001,
    m0002,
    m0003,
    m0004,
    m0005,
    m0006,
    m0007,
  },
};
