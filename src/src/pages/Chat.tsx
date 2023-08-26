import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase-config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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
  profilePhoto: string;
  imageURL: string;
  imageName: string;
  createdAt: number;
}

const Chat = (props: Props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedImage, setSelectedImage] = useState<null | Blob>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const messagesRef = collection(db, "messages");
  const chatRef = useRef<null | HTMLDivElement>(null);
  let progress: number = 0;

  const clearStates = () => {
    progress = 0;
    setSelectedImage(null);
    setImageURL("");
    setNewMessage("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView();
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

  const deleteImage = (imageName: string) => {
    const storageRef = ref(storage, imageName);

    deleteObject(storageRef)
      .then(() => {
        console.log(`File ${storageRef} has been deleted from Firebase`);
      })
      .catch((error) => {
        console.log(`Couldn't delete file due to: ${error}`);
      });
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
          setImageName(selectedImage.name);
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
        imageName,
        user: auth.currentUser.displayName,
        room: props.room,
      });
      clearStates();
    }
  };

  useEffect(() => {
    if (selectedImage != null) {
      uploadImage(selectedImage);
    }
  }, [selectedImage]);

  return (
    <div>
      <div className="flex flex-row w-full bg-[#352F44] p-8 top-0 z-10 fixed justify-between items-center">
        <div>
          <button onClick={() => props.resetRoom()}>
            <svg
              className="fill-[#FAF0E6] text-2xl hover:scale-150 transition"
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
      <div className="overflow-y-auto mt-[7em] mb-[6em]">
        {messages.map((message: Message) => (
          <div
            className="text-[#FAF0E6] justify-center group font-rubik flex text-left md:mx-[5%] lg:mx-[10%] xl:mx-[20%] p-4"
            key={message.id}
          >
            <div className="mx-4">
              <img
                className="h-12 w-12 rounded-full drop-shadow-lg"
                src={message.profilePhoto}
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
                <img className="rounded-xl p-2" src={message.imageURL} />
              </div>
              <p>{message.text}</p>
            </div>
            <div
              className={`invisible ${
                message.user === auth.currentUser?.displayName
                  ? "group-hover:visible"
                  : ""
              }`}
            >
              <button
                onClick={async () => {
                  await deleteDoc(doc(db, "messages", message.id));
                  if (message.imageName) {
                    deleteImage(imageName);
                  }
                }}
              >
                <svg
                  className="drop-shadow-xl transition fill-[#FAF0E6] hover:fill-[#FF0000] hover:scale-150"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <form className="w-full bottom-0 fixed" onSubmit={handleSubmit}>
        <div>
          {selectedImage && (
            <div className="bg-[#5C5470] w-fit relative rounded-xl p-6 m-8 drop-shadow-xl">
              <div className="group" onClick={() => setSelectedImage(null)}>
                <img
                  className="h-80 group-hover:brightness-50 transition rounded-xl"
                  src={URL.createObjectURL(selectedImage)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition fill-[#FAF0E6] absolute group-hover:visible invisible top-1/2 left-1/2"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="font-robotomono py-6 bg-[#5C5470] p-4 pl-6 mt-6 flex justify-center">
          <label
            id="myFile-label"
            className="bg-[#B9B4C7] p-2 rounded-full mr-6 drop-shadow-xl"
            htmlFor="myFile"
          >
            <svg
              className="fill-[#352F44]"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </label>
          <input
            id="myFile"
            className="hidden"
            name="myFile"
            type="file"
            onChange={(e: any) => {
              setSelectedImage(e.target.files[0]);
            }}
          />
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
