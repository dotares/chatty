import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase-config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Navbar from "../components/NavbarSection/Navbar";
import { SignUserOutProps } from "../types/signUserOutProps";
import { Message } from "../types/Message";
import MessageComponent from "../components/ChatSection/MessageComponent";
import FilePreview from "../components/FileInputSection/FilePreview";
import FileInput from "../components/FileInputSection/FileInput";

export interface ChatProps extends SignUserOutProps {
  room: string;
  resetRoom: Function;
}

const Chat: React.FC<ChatProps> = ({ room, resetRoom, signUserOut }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedImage, setSelectedImage] = useState<null | Blob>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [toggleDisable, setToggleDisable] = useState<boolean>(true);
  const messagesRef = collection(db, "messages");
  const chatRef = useRef<null | HTMLDivElement>(null);
  let progress: number = 0;

  const clearStates = () => {
    progress = 0;
    setSelectedImage(null);
    setImageURL("");
    setImageName("");
    setNewMessage("");
    setToggleDisable(true);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
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

  const uploadImage = (selectedImage: Blob) => {
    const storageRef = ref(storage, selectedImage.name);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress = Math.trunc(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setImageName(uploadTask.snapshot.ref.name);
          setToggleDisable(false);
          console.log(`Download link available at: ${downloadURL}`);
        });
      }
    );
  };

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (newMessage === "" && selectedImage === null) return;
    if (auth.currentUser) {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        profilePhoto: auth.currentUser.photoURL,
        imageURL,
        imageNameMessage: imageName,
        user: auth.currentUser.displayName,
        room,
      });
    }
    clearStates();
  };

  useEffect(() => {
    if (selectedImage != null) {
      uploadImage(selectedImage);
    }
  }, [selectedImage]);

  return (
    <div>
      <Navbar room={room} resetRoom={resetRoom} signUserOut={signUserOut} />
      <div className="overflow-y-auto mt-[7em] mb-[6em]">
        {messages.map((message) => (
          <MessageComponent message={message} getTime={getTime} />
        ))}
        <div ref={chatRef} />
      </div>
      {/* Chat Input Section */}
      <form className="w-full bottom-0 fixed" onSubmit={handleSubmit}>
        {/* Image Preview Section*/}
        <FilePreview
          selectedImage={selectedImage}
          imageName={imageName}
          imageURL={imageURL}
          setSelectedImage={setSelectedImage}
          setImageName={setImageName}
          setImageURL={setImageURL}
        />
        {/* Text and Image Input Section */}
        <div className="font-robotomono py-6 bg-[#5C5470] p-4 pl-6 mt-6 flex justify-center">
          {/* Image Input */}
          <FileInput setSelectedImage={setSelectedImage} />
          {/* Text Input  */}
          <input
            className="w-full bg-[#5C5470] text-[#FAF0E6] placeholder:font-robotomono placeholder:text-[#B9B4C7] outline-0 placeholder:text-sm"
            placeholder={`Message ${room}`}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            type="text"
          />
          <button
            className="px-4"
            type="submit"
            disabled={selectedImage ? toggleDisable : false}
          >
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
