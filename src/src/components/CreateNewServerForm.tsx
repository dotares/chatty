import React from "react";
import { SetRoomProps } from "../types/setRoomProps";

interface CreateNewServerFormProps extends SetRoomProps {
  roomInputRef: React.RefObject<HTMLInputElement>;
}

const CreateNewServerForm: React.FC<CreateNewServerFormProps> = ({
  setRoom,
  roomInputRef,
}) => {
  return (
    <div>
      <label>Enter server name</label>
      <input type="text" ref={roomInputRef} />
      <button
        onClick={() => {
          if (roomInputRef.current) {
            setRoom(roomInputRef.current.value);
          }
        }}
      >
        <svg
          className="transition group-hover:scale-110 fill-[#FAF0E6] group-hover:fill-[#5C5470]"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
    </div>
  );
};

export default CreateNewServerForm;
