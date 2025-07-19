import { useState } from "react";
import type { arrayType } from "../types/ArrayTypes";
import { socket } from "../socket";
import useClassesAndColors from "../utility/useClassesAndColors";

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
  const { addColorToMap, getColor } = useClassesAndColors();

  const handleAddRoomEvent = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const alreadyThere = array.find((xx) => xx.room === roomName);
    if (alreadyThere || roomName === "") {
      setRoomName("");
      return;
    }

    //newly added rooms appear at top
    setArray((arr) => [
      { room: roomName, messages: [{ msg: "", sent: false }], unread: 0 },
      ...arr,
    ]);
    setRoom(roomName);

    //adding room,color to the map
    addColorToMap(roomName, array);

    //socket logic
    socket.emit("join-room", roomName);

    setRoomName("");
  };

  const handleRoomDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    room: string
  ) => {
    e.preventDefault();
    setRoom((currRoom) => (currRoom === room ? "public" : currRoom));
    setArray((arr) => arr.filter((xx) => xx.room !== room));

    //socket logic
    socket.emit("leave-room", room);
  };

  const onRoomClick = (room: string) => {
    setRoom(room);
    const idx = array.findIndex((xx) => xx.room === room);
    array[idx].unread = 0;
  };

  return (
    <div className="bg-black text-white border-r-4 border-purple-800 p-1">
      <div className="text-center">
        <p className="text-2xl font-bold text-purple-400 mb-4">Add a Room:</p>
        <div className="flex justify-center">
          <input
            className="bg-gray-800 hover:bg-gray-600 focus:bg-gray-600 w-70 p-2 rounded border border-purple-600 outline-0"
            type="text"
            placeholder="RoomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddRoomEvent(e)}
          />
          <button
            className="cursor-pointer bg-purple-600 p-2 text-lg hover:bg-purple-800"
            onClick={(e) => handleAddRoomEvent(e)}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center h-[90vh]">
        {array
          // .map((xx) => xx.room)
          .filter((xx) => xx.room !== "")
          .map((xx, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[8fr_1fr] items-center px-2 cursor-pointer"
            >
              <div
                className={`text-xl bg-${getColor(
                  xx.room
                )}-500 text-center py-2 rounded-2xl flex justify-between px-10 items-center`}
                onClick={() => onRoomClick(xx.room)}
              >
                <p className="font-medium">{xx.room}</p>
                {xx.unread ? (
                  <p className="bg-black font-bold rounded-full h-7 w-7 flex justify-center items-center">
                    {xx.unread}
                  </p>
                ) : null}
              </div>
              {xx.room === "public" ? null : (
                <button
                  onClick={(e) => handleRoomDelete(e, xx.room)}
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
