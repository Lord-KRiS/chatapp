import React, { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../socket";
import type { arrayType } from "../types/ArrayTypes";
import { useAtomValue } from "jotai";
import { getClassesAtom } from "../utility/atoms";
import { changeElPosn } from "../utility/changeEl";
// import useClassesAndColors from "../utility/atoms";
// import { getClasses } from "../utility/useClassesAndColors";

function MessagingArea({
  currRoom,
  array,
  setArray,
}: {
  currRoom: string;
  array: arrayType[];
  setArray: React.Dispatch<React.SetStateAction<arrayType[]>>;
}) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  // const getClasses =

  function goToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (message === "") return;

    setArray((prev) =>
      prev.map((r) =>
        r.room === currRoom
          ? { ...r, messages: [...r.messages, { msg: message, sent: true }] }
          : r
      )
    );

    //socket logic
    socket.emit("msg for room", currRoom, message);

    setMessage("");
  }

  function clearMessages(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setArray((prev) =>
      prev.map((r) =>
        r.room === currRoom ? { ...r, messages: [{ msg: "", sent: false }] } : r
      )
    );
  }

  useEffect(() => {
    const onConnect = () => console.log("connected", socket.id);
    const onDisconnect = () => console.log("disconnected");
    const onMsg = (room: string, message: string) => {
      setArray((prev) => {
        const newArr = prev.map((r) =>
          r.room === room
            ? {
                ...r,
                messages: [...r.messages, { msg: message, sent: false }],
                unread: r.room === currRoom ? 0 : r.unread + 1,
              }
            : r
        );
        const idx = newArr.findIndex((xx) => xx.room === room);
        changeElPosn(newArr, idx, 0);
        return newArr;
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("msg for clients", onMsg);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("msg for clients", onMsg);
    };
  }, [currRoom, setArray]);

  useEffect(goToBottom, [array]);

  return (
    <div className="flex flex-col min-h-screen relative ">
      <div className="flex flex-col h-[92vh]">
        <div className="flex-1 overflow-y-auto bg-slate-400 text-white p-4">
          <p className="text-5xl text-center font-medium underline mb-4 text-purple-900">
            {currRoom}
          </p>
          <div className="flex flex-col gap-2">
            {array
              .find((xx) => xx.room === currRoom)
              ?.messages.filter((M) => M.msg !== "")
              .map((M, idx) => (
                <MessageItem
                  key={idx}
                  isSent={M.sent}
                  room={currRoom}
                  message={M.msg}
                />
              ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="h-[10vh] grid grid-cols-[8fr_1fr] border-t text-2xl">
          <input
            type="text"
            className="px-3 border-r-2 outline-none bg-blue-300"
            placeholder="text to the server"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="px-3 bg-green-300">
            Send server
          </button>
        </div>
      </form>

      <button
        onClick={goToBottom}
        className="bg-gray-800 p-2 cursor-pointer fixed bottom-2 right-2 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
      <button
        onClick={clearMessages}
        className="bg-gray-800 text-gray-300 p-2 cursor-pointer fixed top-2 right-2 rounded text-xl"
      >
        Clear
      </button>
    </div>
  );
}

export default MessagingArea;

const MessageItem = ({
  isSent,
  message,
  room,
}: {
  isSent: boolean;
  message: string;
  room: string;
}) => {
  const classes = useAtomValue(useMemo(() => getClassesAtom(room), [room]));
  return (
    <div
      className={`text-xl py-2 px-4 rounded-lg break-words max-w-[70%] ${
        isSent ? classes[0] : classes[1]
      }`}
    >
      {message}
    </div>
  );
};
