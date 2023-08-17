import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    onSnapshot(queryMessages, (snapshot) => {
      let messagesArray = [];
      snapshot.forEach((doc) => {
        messagesArray.push({ ...doc.data(), key: doc.id });
      });

      setMessages(messagesArray);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="fixed bottom-0 w-full">
      <div>
        {messages.map((message) => (
          <h1>{message.text}</h1>
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
  );
};

export default Chat;
