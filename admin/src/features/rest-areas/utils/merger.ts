import type { RestAreaWithInfo } from "@/api/supabase";
import { equalByTrafikverketId, equalByCoordinates, sortByUpdatedAt } from "./utils";

export type AreasUpdate = {
  original: RestAreaWithInfo;
  versions: RestAreaWithInfo[];
};

export type Action = "ready" | "add" | "update" | "merge" | "skip" | "done";

export type MergeState = {
  action: Action;
  current: RestAreaWithInfo[];
  unprocessed: RestAreaWithInfo[];
  updated: AreasUpdate[];
};

type Result =
  | {
      error?: never;
      result: MergeState;
    }
  | {
      error: { message: string };
      result?: never;
    };

export const merger = {
  getNextBatch: (merge: MergeState): Result => {
    const { current, unprocessed, updated } = merge;
    if (updated.length != 0) throw new Error("Updates should be empty at this point");

    if (unprocessed.length === 0) return { result: { ...merge, action: "done" } };

    switch (getNextAction(current, unprocessed[0])) {
      case "add": {
        do {
          const newArea = unprocessed.shift()!;
          updated.push({ original: newArea, versions: [] });
        } while (
          unprocessed.length > 0 &&
          isAddAction([...current, ...updated.flatMap(a => a.original)], unprocessed[0])
        );
        return { result: { ...merge, action: "add" } };
      }
      case "update": {
        do {
          const newArea = unprocessed.shift()!;
          const existing = updated.find(area => equalByTrafikverketId(area.original, newArea));
          if (existing) existing.versions.push(newArea);
          else {
            const original = current.find(area => equalByTrafikverketId(area, newArea))!;
            updated.push({ original, versions: [newArea] });
          }
        } while (unprocessed.length > 0 && isUpdateAction(current, unprocessed[0]));
        return { result: { ...merge, action: "update" } };
      }
      case "merge": {
        do {
          const newArea = unprocessed.shift()!;
          const existing = updated.find(area => equalByCoordinates(area.original, newArea));
          if (existing) existing.versions.push(newArea);
          else {
            const original = current.find(area => equalByCoordinates(area, newArea))!;
            updated.push({ original, versions: [newArea] });
          }
        } while (unprocessed.length > 0 && isMergeAction(current, unprocessed[0]));
        return { result: { ...merge, action: "merge" } };
      }
      case "skip": {
        do {
          const newArea = unprocessed.shift()!;
          const existing = updated.find(area => equalByCoordinates(area.original, newArea));
          if (existing) existing.versions.push(newArea);
          else {
            const original = current.find(area => equalByCoordinates(area, newArea))!;
            updated.push({ original, versions: [newArea] });
          }
        } while (unprocessed.length > 0 && isSkipAction(current, unprocessed[0]));
        return { result: { ...merge, action: "skip" } };
      }
      default:
        return { error: { message: "Unprocessed action detected" } };
    }
  },
  updateState: (merge: MergeState): MergeState => {
    const { action, current, updated, unprocessed } = merge;

    switch (action) {
      case "ready":
        return merge;
      case "add":
        return {
          ...merge,
          current: [...current, ...updated.flatMap(u => u.original)].sort(sortByUpdatedAt),
          updated: [],
        };
      case "update":
        return {
          ...merge,
          action: unprocessed.length > 0 ? "ready" : "done",
          current: current
            .map(area => {
              const update = updated.find(u => u.original.id === area.id);
              return update ? update.versions[0] : area;
            })
            .sort(sortByUpdatedAt),
          updated: [],
        };
      case "merge":
        return {
          ...merge,
          action: unprocessed.length > 0 ? "ready" : "done",
          current: current
            .map(area => {
              const update = updated.find(u => u.original.id === area.id);
              return update ? update.versions[0] : area;
            })
            .sort(sortByUpdatedAt),
          updated: [],
        };
      case "skip":
        return {
          ...merge,
          action: unprocessed.length > 0 ? "ready" : "done",
          unprocessed: unprocessed.filter(area =>
            updated.flatMap(u => u.versions).some(v => v.id !== area.id),
          ),
          updated: [],
        };
      default:
        throw new Error("Invalid action type");
    }
  },
};

const getNextAction = (
  currentAreas: ReadonlyArray<RestAreaWithInfo>,
  newArea: Readonly<RestAreaWithInfo>,
) => {
  if (!newArea) return;
  if (isAddAction(currentAreas, newArea)) return "add";
  if (isUpdateAction(currentAreas, newArea)) return "update";
  if (isMergeAction(currentAreas, newArea)) return "merge";
  if (isSkipAction(currentAreas, newArea)) return "skip";

  throw new Error("Unprocessed action detected");
};

const isAddAction = (
  currentAreas: ReadonlyArray<RestAreaWithInfo>,
  newArea: Readonly<RestAreaWithInfo>,
) =>
  !currentAreas.some(
    area => equalByTrafikverketId(area, newArea) || equalByCoordinates(area, newArea),
  );

const isUpdateAction = (
  currentAreas: ReadonlyArray<RestAreaWithInfo>,
  newArea: Readonly<RestAreaWithInfo>,
) => currentAreas.some(area => equalByTrafikverketId(area, newArea));

const isMergeAction = (
  currentAreas: ReadonlyArray<RestAreaWithInfo>,
  newArea: Readonly<RestAreaWithInfo>,
) =>
  !newArea.deleted &&
  currentAreas.some(area => equalByCoordinates(area, newArea)) &&
  !currentAreas.some(area => equalByTrafikverketId(area, newArea));

const isSkipAction = (
  currentAreas: ReadonlyArray<RestAreaWithInfo>,
  newArea: Readonly<RestAreaWithInfo>,
) =>
  newArea.deleted &&
  !currentAreas.some(area => equalByTrafikverketId(area, newArea)) &&
  currentAreas.some(area => equalByCoordinates(area, newArea));
