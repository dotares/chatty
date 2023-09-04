import React from "react";
import { SetRoomProps } from "../types/setRoomProps";

interface CustomServerInputProps extends SetRoomProps {
  roomInputRef: React.RefObject<HTMLInputElement>;
}

const CustomServerInput: React.FC<CustomServerInputProps> = ({
  roomInputRef,
  setRoom,
}) => {
  return (
    <div>
      <div className="font-robotomono bg-[#5C5470] rounded-full p-4 pl-6 flex justify-center drop-shadow-xl">
        <input
          className="w-full bg-[#5C5470] text-[#FAF0E6] placeholder:font-robotomono placeholder:text-[#B9B4C7] outline-0 placeholder:text-sm"
          placeholder="Enter room name ..."
          type="text"
          ref={roomInputRef}
        />
        <button
          className="group p-4 drop-shadow-xl bg-[#352F44] rounded-full transition hover:scale-110 hover:bg-[#B9B4C7]"
          onClick={() => {
            if (roomInputRef.current) {
              setRoom(roomInputRef.current.value);
            }
          }}
        >
          <svg
            className="transition h-full w-full fill-[#FAF0E6] group-hover:fill-[#5C5470] group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            height="1.2em"
            viewBox="0 0 512 512"
          >
            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomServerInput;
