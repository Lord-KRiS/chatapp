import type { arrayType } from "../types/ArrayTypes";
import { atom } from "jotai";

export const colors = [
  "orange",
  "red",
  "amber",
  "emerald",
  "blue",
  "slate",
  "yellow",
];

export const colorForRoomsAtom = atom(new Map([["public", "orange"]]));
export const addColorToMapAtom = atom(
  null,
  (get, set, { room, array }: { room: string; array: arrayType[] }) => {
    const color = colors[array.length % colors.length];
    const newMap = get(colorForRoomsAtom);
    newMap.set(room, color);
    set(colorForRoomsAtom, newMap);
  }
);
export const getColorAtom = (room: string) =>
  atom((get) => {
    const colorMap = get(colorForRoomsAtom);
    return colorMap.get(room);
  });

export const getClassesAtom = (room: string) =>
  atom((get) => {
    const colorMap = get(colorForRoomsAtom);
    const color = colorMap.get(room);

    return [
      `ml-auto bg-${color}-200 text-black text-right mr-2`,
      `mr-auto bg-${color}-800 text-white text-left ml-2`,
    ];
  });