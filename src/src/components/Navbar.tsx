import React from "react";
import { ChatProps } from "../pages/Chat";
import SignOut from "./SignOut";
import ResetRoom from "./ResetRoom";

const Navbar: React.FC<ChatProps> = ({ room, resetRoom, signUserOut }) => {
  return (
    <div className="flex flex-row w-full bg-[#352F44] p-8 top-0 z-10 fixed justify-between items-center">
      <div>
        <ResetRoom resetRoom={resetRoom} />
      </div>
      <div className="font-pacifico text-[#FAF0E6]">
        <h1 className="text-4xl text-center">{room}</h1>
      </div>
      <div>
        <SignOut signUserOut={signUserOut} />
      </div>
    </div>
  );
};

export default Navbar;
