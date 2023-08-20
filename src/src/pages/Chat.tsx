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
      <div>
        <h1 className="text-xl text-center">Welcome to: {props.room}</h1>
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
        <form className="flex" onSubmit={handleSubmit}>
          <input
            className="border-2 w-full border-black"
            placeholder="Type your message here"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            type="text"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
