import type { arrayType } from "../types/ArrayTypes";

export const changeElPosn = (array: arrayType[], from: number, to: number) => {
  const element = array[from];
  array.splice(from, 1);
  array.splice(to, 0, element);
};
