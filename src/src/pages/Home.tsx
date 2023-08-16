import { useState, useRef } from "react";
import SignUp from "./SignUp";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isRoom, setIsRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <SignUp />
      </div>
    );
  }

  return (
    <div>
      {isRoom ? (
        <div>Chat</div>
      ) : (
        <div>
          <input
            className="border-2 border-black"
            type="text"
            ref={roomInputRef}
          />
          <button onClick={() => setIsRoom(roomInputRef.current.value)}>
            Enter chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
