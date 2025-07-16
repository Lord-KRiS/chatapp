import { useState } from "react";

function Rooms() {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([""]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRooms((r) => (rooms.includes(roomName) ? r : [...r, roomName]));
    setRoomName("");
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
        {rooms
          .filter((r) => r !== "")
          .map((room, idx) => (
            <div key={idx} className="flex justify-between">
              <p>{room}</p>
              <div
                onClick={() => {
                  setRooms((r) => r.filter((R) => R !== room));
                }}
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
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Rooms;
