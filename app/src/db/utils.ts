import { getTableColumns, sql, SQL, Table } from "drizzle-orm";

/**
 * Utility function to generate a conflict update object for all columns except specified ones.
 * This is useful for handling upserts in SQLite where you want to update all fields except specified ones.
 *
 * @param table - The table schema to generate the conflict update for.
 * @param except - An array of column names to exclude from the update.
 * @returns An object mapping column names to their SQL expressions for the conflict update.
 */

// from https://github.com/drizzle-team/drizzle-orm/issues/1728#issuecomment-2148635569

export function conflictUpdateAllExcept<T extends Table, E extends (keyof T["$inferInsert"])[]>(
  table: T,
  except: E,
) {
  const columns = getTableColumns(table);
  const updateColumns = Object.entries(columns).filter(
    ([col]) => !except.includes(col as keyof typeof table.$inferInsert),
  );

  return updateColumns.reduce(
    (acc, [colName, table]) => ({ ...acc, [colName]: sql.raw(`excluded.${table.name}`) }),
    {},
  ) as Record<keyof typeof table.$inferInsert, SQL>;
}
