import React from "react";
import SignOut from "./SignOut";
import ResetRoom from "./ResetRoom";
import { Room } from "../types/Room";
import { SignUserOutProps } from "../types/SignUserOutProps";

interface NavbarProps extends Room, SignUserOutProps {
  room: Room;
  resetRoom: Function;
}

const Navbar: React.FC<NavbarProps> = ({ room, resetRoom, signUserOut }) => {
  return (
    <div className="flex flex-row w-full bg-[#352F44] p-8 top-0 z-10 fixed justify-between items-center">
      <div>
        <ResetRoom resetRoom={resetRoom} />
      </div>
      <div className="font-pacifico text-[#FAF0E6]">
        <h1 className="text-4xl text-center">{room.name}</h1>
      </div>
      <div>
        <SignOut signUserOut={signUserOut} />
      </div>
    </div>
  );
};

export default Navbar;
