import { useState } from "react";
import type { arrayType } from "../types/ArrayTypes";
import { socket } from "../socket";
import { colors } from "../colors";
import { getColor } from "../utility/classes";

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

  // const getColor = (array:arrayType[], curRoom: string) => {
  //   const idx = array
  //     .map((xx) => xx.room)
  //     .findIndex((room) => room === curRoom);

  //   console.log(colors[idx % colors.length]);

  //   return colors[idx % colors.length];
  // };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const alreadyThere = array.find((xx) => xx.room === roomName);
    if (alreadyThere || roomName === "") {
      setRoomName("");
      return;
    }

    setArray((arr) => [
      ...arr,
      { room: roomName, messages: [{ msg: "", sent: false }] },
    ]);
    setRoom(roomName);

    //socket logic
    socket.emit("join-room", roomName);

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
    <div className="text-white border-r border-gray-400 p-1">
      <div className="text-center">
        <p className="text-xl font-bold">Add a Room:</p>
        <div className="flex">
          <input
            className="bg-gray-800 hover:bg-gray-600 focus:bg-gray-600 w-60 p-2 rounded border border-amber-900 outline-0"
            type="text"
            placeholder="RoomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="cursor-pointer bg-orange-800 p-2 text-lg hover:bg-orange-600"
            onClick={(e) => handleClick(e)}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center h-[90vh]">
        {array
          .map((xx) => xx.room)
          .filter((room) => room !== "")
          .map((room, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[8fr_1fr] items-center px-2 cursor-pointer "
            >
              <p
                className={`text-xl bg-${getColor(
                  array,
                  room
                )}-500 text-center py-2 rounded-2xl`}
                onClick={() => setRoom(room)}
              >
                {room}
              </p>
              {room === "public" ? null : (
                <button
                  onClick={(e) => handleDelete(e, room)}
                  className="bg-gray-400 cursor-pointer flex justify-center rounded-xl p-2"
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
