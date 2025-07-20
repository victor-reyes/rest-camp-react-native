import * as SQLite from "expo-sqlite";

export const client = SQLite.openDatabaseSync("db.db");
