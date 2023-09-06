import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { auth, db, storage } from "../firebase-config";
import { Message } from "../types/Message";

interface MessageProps {
  message: Message;
  getTime: Function;
}

const MessageComponent: React.FC<MessageProps> = ({ message, getTime }) => {
  return (
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
          {message.imageURL ? (
            <img className="rounded-xl p-2" src={message.imageURL} />
          ) : null}
        </div>
        <p>{message.text}</p>
      </div>
      {/* Delete Button */}
      {message.user === auth.currentUser?.displayName ? (
        <div className="invisible group-hover:visible">
          <button
            onClick={async () => {
              await deleteDoc(doc(db, "messages", message.id));
              if (message.imageNameMessage)
                await deleteObject(ref(storage, message.imageNameMessage));
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
      ) : (
        <svg
          className="invisible drop-shadow-xl transition fill-[#FAF0E6] hover:fill-[#FF0000] hover:scale-150"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      )}
    </div>
  );
};

export default MessageComponent;
