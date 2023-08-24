import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import SignOut from "../components/SignOut";

interface Props {
  room: string;
  resetRoom: Function;
  signUserOut: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface Message {
  id: string;
  user: string;
  text: string;
  room: string;
  photo: string;
  createdAt: number;
}

const Chat = (props: Props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = collection(db, "messages");
  const chatRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", props.room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesArray: Message[] = [];
      snapshot.forEach((doc) => {
        messagesArray.push({ ...doc.data(), id: doc.id } as Message);
      });
      setMessages(messagesArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (newMessage === "") return;
    if (auth.currentUser) {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        photo: auth.currentUser.photoURL,
        user: auth.currentUser.displayName,
        room: props.room,
      });
    }
    setNewMessage("");
  };

  const getTime = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.toLocaleDateString("en-IN", {
      month: "2-digit",
      day: "2-digit",
    });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `on ${day} @ ${time}`;
  };

  return (
    <div>
      <div className="flex flex-row w-full bg-[#352F44] p-8 top-0 z-10 fixed justify-between items-center">
        <div>
          <button onClick={() => props.resetRoom()}>
            <svg
              className="fill-[#FAF0E6] text-2xl"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
          </button>
        </div>
        <div className="font-pacifico text-[#FAF0E6]">
          <h1 className="text-4xl text-center">{props.room}</h1>
        </div>
        <div>
          <SignOut signUserOut={props.signUserOut} />
        </div>
      </div>
      <div className="overflow-y-auto mt-[7em] mb-[5em]">
        {messages.map((message: Message) => (
          <div
            className="text-[#FAF0E6] items-center group font-rubik flex text-left md:mx-[5%] lg:mx-[10%] xl:mx-[20%] p-4"
            key={message.id}
          >
            <div className="mx-4">
              <img
                className="h-12 w-12 rounded-full drop-shadow-lg"
                src={message.photo}
              />
            </div>
            <div className="flex flex-col w-2/3">
              <div className="flex space-x-2 items-center">
                <p className="font-bold">{message.user}</p>
                <p className="font-light text-[#B9B4C7] text-[0.7em]">
                  {getTime(message.createdAt)}
                </p>
              </div>
              <div>
                <p>{message.text}</p>
              </div>
            </div>
            <div
              className={`${
                message.user === auth.currentUser?.displayName
                  ? "invisible group-hover:visible"
                  : "invisible"
              }`}
            >
              <button
                onClick={() => {
                  console.log("ive been clicked");
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <form className="w-full bottom-0 fixed" onSubmit={handleSubmit}>
        <div className="font-robotomono py-6 bg-[#5C5470] p-4 pl-6 mt-6 flex justify-center">
          <input
            className="w-full bg-[#5C5470] text-[#FAF0E6] placeholder:font-robotomono placeholder:text-[#B9B4C7] outline-0 placeholder:text-sm"
            placeholder={`Message ${props.room}`}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            type="text"
          />
          <button className="px-4" type="submit">
            <svg
              className="transition fill-[#FAF0E6] text-2xl hover:scale-150"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
