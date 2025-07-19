import { useState } from "react";
import type { arrayType } from "../types/ArrayTypes";

export const colors = [
  "orange",
  "red",
  "amber",
  "emerald",
  "blue",
  "slate",
  "yellow",
];

function useClassesAndColors() {
  const [colorForRooms, setColorForRooms] = useState<Map<string, string>>(
    new Map([["public", "orange"]])
  );

  const addColorToMap = (room: string, array: arrayType[]) => {
    const color = colors[array.length % colors.length];
    setColorForRooms((prev) => {
      const newMap = new Map(prev);
      newMap.set(room, color);
      return newMap;
    });
  };

  const getColor = (room: string) => {
    return colorForRooms.get(room);
  };

  const getClasses = (room: string) => {
    const color = colorForRooms.get(room);

    return [
      `ml-auto bg-${color}-200 text-black text-right mr-2`,
      `mr-auto bg-${color}-800 text-white text-left ml-2`,
    ];
  };

  return { addColorToMap, getColor, getClasses };
}

export default useClassesAndColors;

// export const colorForRooms = new Map();
// colorForRooms.set("public", "orange");

// export const addColorToMap = (room: string, array: arrayType[]) => {
//   const color = colors[array.length % colors.length];
//   colorForRooms.set(room, color);
// };

// export const getColor = (array: arrayType[], room: string) => {
//   console.log(colorForRooms);
//   //   const idx = array.map((xx) => xx.room).findIndex((room) => room === curRoom);
//   return colorForRooms.get(room);
//   //   return colors[idx % colors.length];
// };

// export const getClasses = (array: arrayType[], room: string) => {
//   //   const idx = array.map((xx) => xx.room).findIndex((room) => room === curRoom);

//   //   console.log(colors[idx % colors.length]);

//   const color = colorForRooms.get(room);
//   //   const color = colors[idx % colors.length];

//   return [
//     `ml-auto bg-${color}-200 text-black text-right mr-2`,
//     `mr-auto bg-${color}-800 text-white text-left ml-2`,
//   ];
// };
