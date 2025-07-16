import { useState } from "react";
import type { arrayType } from "../types/ArrayTypes";
import { socket } from "../socket";

function Rooms({
  setRoom,
  array,
  setArray,
}: {
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  array: arrayType[];
  setArray: React.Dispatch<React.SetStateAction<arrayType[]>>;
}) {
  const [roomName, setRoomName] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const alreadyThere = array.find((xx) => xx.room === roomName);
    if (!alreadyThere) {
      setArray((arr) => [
        ...arr,
        { room: roomName, messages: [{ msg: "", sent: false }] },
      ]);
      setRoom(roomName);

      //socket logic
      socket.emit("join-room", roomName);
    }
    setRoomName("");
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    room: string
  ) => {
    e.preventDefault();
    setRoom((currRoom) => (currRoom === room ? "public" : currRoom));
    setArray((arr) => arr.filter((xx) => xx.room !== room));

    //socket logic
    socket.emit("leave-room", room);
  };

  return (
    <div className="">
      <p>Add a Room:</p>
      <input
        type="text"
        placeholder="RoomName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={(e) => handleClick(e)}>Add</button>
      <div className="flex flex-col">
        {array
          .map((xx) => xx.room)
          .filter((room) => room !== "")
          .map((room, idx) => (
            <div key={idx} className="grid grid-cols-[8fr_1fr]">
              <p onClick={() => setRoom(room)}>{room}</p>
              {room === "public" ? null : (
                <button
                  onClick={(e) => handleDelete(e, room)}
                  className="bg-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Rooms;
