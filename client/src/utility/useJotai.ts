import { useAtomValue } from "jotai";
import { getColorAtom } from "./atoms";
import { useMemo } from "react";

function useJotai(room: string) {
  console.log("check pls pls");
  const memoAtom = useMemo(() => getColorAtom(room), [room]);
  return useAtomValue(memoAtom);
}

export default useJotai;
