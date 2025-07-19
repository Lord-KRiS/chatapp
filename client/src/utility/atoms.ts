import { useState } from "react";
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

// function useClassesAndColors() {
//   const [colorForRooms, setColorForRooms] = useState<Map<string, string>>(
//     new Map([["public", "orange"]])
//   );

//   const addColorToMap = (room: string, array: arrayType[]) => {
//     const color = colors[array.length % colors.length];
//     setColorForRooms((prev) => {
//       const newMap = new Map(prev);
//       newMap.set(room, color);
//       return newMap;
//     });
//   };

//   const getColor = (room: string) => {
//     console.log("colorForRooms", colorForRooms);
//     // console.log(colorForRooms.get(room));
//     return colorForRooms.get(room);
//   };

//   const getClasses = (room: string) => {
//     // const color = colorForRooms.get(room);
//     console.log(room);
//     console.log(colorForRooms.get(room));
//     console.log(colorForRooms);
//     const color = getColor(room);

//     return [
//       `ml-auto bg-${color}-200 text-black text-right mr-2`,
//       `mr-auto bg-${color}-800 text-white text-left ml-2`,
//     ];
//   };

//   return { addColorToMap, getColor, getClasses };
// }

// export default useClassesAndColors;

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
    // console.log("colorForRooms", colorMap);
    return colorMap.get(room);
  });

export const getClassesAtom = (room: string) =>
  atom((get) => {
    // console.log(room);
    const colorMap = get(colorForRoomsAtom);
    // console.log(colorMap.get(room));
    // console.log(colorMap);
    const color = colorMap.get(room);

    return [
      `ml-auto bg-${color}-200 text-black text-right mr-2`,
      `mr-auto bg-${color}-800 text-white text-left ml-2`,
    ];
  });

// JOTAI LOGICC
// import { atom } from "jotai";
// import axios from "axios";
// import { getMe } from "../lib/sessionlogic";

// // User state
// export const userAtom = atom<any | null>(null);

// // Loading state
// export const loadingAtom = atom(true);

// // Async fetchMe logic
// export const fetchMeAtom = atom(null, async (get, set) => {
//   try {
//     const user = await getMe();
//     set(userAtom, user);
//   } catch (err) {
//     set(userAtom, null);
//   } finally {
//     set(loadingAtom, false);
//   }
// });

// // Logout logic
// export const logoutAtom = atom(null, async (_get, set) => {
//   await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
//   set(userAtom, null);
// });

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
