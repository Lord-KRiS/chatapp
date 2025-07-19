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

export const getColor = (array: arrayType[], curRoom: string) => {
  const idx = array.map((xx) => xx.room).findIndex((room) => room === curRoom);

  console.log(colors[idx % colors.length]);

  return colors[idx % colors.length];
};

export const getClasses = (array: arrayType[], curRoom: string) => {
  const idx = array.map((xx) => xx.room).findIndex((room) => room === curRoom);

  console.log(colors[idx % colors.length]);

  const color = colors[idx % colors.length];

  return [
    `ml-auto bg-${color}-200 text-black text-right mr-2`,
    `mr-auto bg-${color}-800 text-white text-left ml-2`,
  ];
};
