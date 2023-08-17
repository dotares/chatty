import { useState, useRef } from "react";
import SignUp from "./SignUp";
import Chat from "./Chat";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <SignUp setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div>
          <input
            className="border-2 border-black"
            type="text"
            ref={roomInputRef}
          />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
