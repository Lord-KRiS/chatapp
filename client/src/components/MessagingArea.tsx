import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

interface arrayType {
  msg: string;
  sent: boolean;
}

function MessagingArea() {
  const [messages, setMessages] = useState<arrayType[]>([
    { msg: "", sent: false },
  ]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  function goToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // function AddToMessages(sent: boolean) {

  // }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message === "") return;
    socket.emit("msg from client", message);
    setMessages((m) => [...m, { msg: message, sent: true }]);
    setMessage("");
  }

  useEffect(() => {
    const onConnect = () => console.log("connected", socket.id);
    const onDisconnect = () => console.log("disconnected");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("msg from server", (msg) => {
      setMessages((m) => [...m, { msg, sent: false }]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("msg from server", (msg) => {
        setMessages((m) => [...m, { msg, sent: false }]);
      });
    };
  }, []);

  useEffect(goToBottom, [messages]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-y-auto overflow-x-hidden">
      <div className="flex-1 bg-black text-white  p-4">
        <p className="text-5xl text-center underline mb-4">Socket connected</p>
        <div className="flex flex-col gap-2">
          {messages
            .filter((M) => M.msg !== "")
            .map((M, idx) => (
              <div
                key={idx}
                className={`text-xl py-2 px-4 rounded-lg break-words max-w-[70%] ${
                  M.sent
                    ? "ml-auto bg-green-800 text-right"
                    : "mr-auto bg-blue-800 text-left"
                }`}
              >
                {M.msg}
              </div>
            ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-[8fr_1fr] border-t text-2xl">
          <input
            type="text"
            className="p-3 border-r-2 outline-none bg-blue-300"
            placeholder="text to the server"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="p-3 bg-green-300">
            Send server
          </button>
          <div ref={messagesEndRef} />
        </div>
      </form>

      <button
        onClick={goToBottom}
        className="bg-slate-200 p-2 cursor-pointer fixed bottom-2 right-2 rounded"
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
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
      <button
        onClick={() => setMessages([])}
        className="bg-slate-200 p-2 cursor-pointer fixed top-2 right-2 rounded text-xl"
      >
        Clear
      </button>
    </div>
  );
}

export default MessagingArea;
