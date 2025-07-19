import Rooms from "./components/Rooms";
import MessagingArea from "./components/MessagingArea";
import { useState } from "react";
import type { arrayType } from "./types/ArrayTypes";

function App() {
  const [room, setRoom] = useState<string>("public");
  const [array, setArray] = useState<arrayType[]>([
    { room: "public", messages: [{ msg: "", sent: false }], unread: 0 },
  ]);

  // useEffect(() => console.log("111111", room), [room]);

  return (
    <div className="grid grid-cols-[1fr_6fr]">
      <Rooms setRoom={setRoom} array={array} setArray={setArray} />
      <MessagingArea currRoom={room} array={array} setArray={setArray} />
    </div>
  );
}

export default App;
