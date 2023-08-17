import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Chat = (props) => {
  const { isRoom } = props;
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      isRoom,
    });

    setNewMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-black"
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
