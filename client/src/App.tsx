import Rooms from "./components/Rooms";
import MessagingArea from "./components/MessagingArea";
import { useEffect, useState } from "react";
import type { arrayType } from "./types/ArrayTypes";

function App() {
  const [room, setRoom] = useState<string>("public");
  const [array, setArray] = useState<arrayType[]>([
    { room: "public", messages: [{ msg: "", sent: false }] },
  ]);

  return (
    <div className="flex">
      <Rooms setRoom={setRoom} array={array} setArray={setArray} />
      <MessagingArea room={room} array={array} setArray={setArray} />
    </div>
  );
}

export default App;
