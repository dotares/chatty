import React, { useState } from "react";
import { SetRoomProps } from "../types/setRoomProps";
import AddAServer from "./AddAServer";
import AddServerModal from "./AddServerModal";

interface JoinedServersProps extends SetRoomProps {
  roomInputRef: React.RefObject<HTMLInputElement>;
}

const JoinedServers: React.FC<JoinedServersProps> = ({
  setRoom,
  roomInputRef,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="gap-12 flex sm:flex-row flex-col justify-center">
      {openModal ? (
        <AddServerModal
          roomInputRef={roomInputRef}
          setRoom={setRoom}
          setOpenModal={setOpenModal}
        />
      ) : (
        <AddAServer setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default JoinedServers;
