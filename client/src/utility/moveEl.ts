import type { arrayType } from "../types/ArrayTypes";

export function arraymove(
  array: arrayType[],
  fromIndex: number,
  toIndex: number
) {
  console.log(array);
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
  console.log(array);
}
