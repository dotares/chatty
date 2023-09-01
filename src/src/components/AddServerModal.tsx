import React, { useState } from "react";
import { setOpenModal } from "../types/setOpenModal";
import CreateNewServerForm from "./CreateNewServerForm";
import JoinExistingServerForm from "./JoinExistingServerForm";
import { SetRoomProps } from "../types/setRoomProps";

interface AddServerModalProps extends setOpenModal, SetRoomProps {
  roomInputRef: React.RefObject<HTMLInputElement>;
}

const AddServerModal: React.FC<AddServerModalProps> = ({
  setOpenModal,
  setRoom,
  roomInputRef,
}) => {
  const [joinServerForm, setJoinServerForm] = useState(false);
  return (
    <div className="w-1/2 h-1/2 z-10 border-2 border-white overflow-hidden">
      <button
        onClick={() => {
          setOpenModal(false);
          setJoinServerForm(false);
        }}
      >
        exit
      </button>
      {joinServerForm ? (
        <div>
          <JoinExistingServerForm />
        </div>
      ) : (
        <div>
          <CreateNewServerForm roomInputRef={roomInputRef} setRoom={setRoom} />
          <button onClick={() => setJoinServerForm(true)}>Join server</button>
        </div>
      )}
    </div>
  );
};

export default AddServerModal;
