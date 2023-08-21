import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

interface Props {
  room: string;
}

interface Message {
  id: string;
  user: string;
  text: string;
  room: string;
  createdAt: Date;
}

const Chat = (props: Props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = collection(db, "messages");

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
        user: auth.currentUser.displayName,
        room: props.room,
      });
    }
    setNewMessage("");
  };

  return (
    <div>
      <div className="font-pacifico text-[#FAF0E6] p-4">
        <h1 className="text-4xl text-center">{props.room}</h1>
      </div>
      <div className="fixed bottom-0 w-full">
        <div>
          {messages.map((message: Message) => (
            <div key={message.id}>
              <span className="font-bold">{message.user} </span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="font-robotomono py-6 bg-[#5C5470] p-4 pl-6 flex justify-center">
            <input
              className="w-full bg-[#5C5470] text-[#FAF0E6] placeholder:font-robotomono placeholder:text-[#B9B4C7] outline-0 placeholder:text-sm"
              placeholder={`Message ${props.room}`}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              type="text"
            />
            <button className="px-4" type="submit">
              <svg
                className="fill-[#FAF0E6]"
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
    </div>
  );
};

export default Chat;
