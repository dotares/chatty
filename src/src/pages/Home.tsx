import { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import SignUp from "./SignUp";
import Chat from "./Chat";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState<string | null>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

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
            placeholder="Enter room name"
          />
          <button
            onClick={() => {
              if (roomInputRef.current) {
                setRoom(roomInputRef.current.value);
              }
            }}
          >
            Enter chat
          </button>
        </div>
      )}
      <div>
        <button onClick={signUserOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Home;
