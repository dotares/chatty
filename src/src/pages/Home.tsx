import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import CustomServerInput from "../components/CustomServerInput";
import MinimalProfileInfo from "../components/MinimalProfileInfo";
import SignOut from "../components/SignOut";
import { auth } from "../firebase-config";
import Chat from "./Chat";
import SignUp from "./SignUp";

const cookies = new Cookies();

const Home = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserPhoto(user.photoURL || "");
        setUserDisplayName(user.displayName);
      } else {
        setUserPhoto("");
        setUserDisplayName(null);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const resetRoom = () => {
    setRoom(null);
  };

  return (
    <div className="text-center">
      {room ? (
        <div>
          <Chat signUserOut={signUserOut} resetRoom={resetRoom} room={room} />
        </div>
      ) : (
        <div>
          <div className="fixed w-full">
            <div className="flex justify-between items-center m-8">
              <MinimalProfileInfo
                userPhoto={userPhoto}
                userDisplayName={userDisplayName}
              />
              <div className="">
                <SignOut signUserOut={signUserOut} />
              </div>
            </div>
          </div>
          <div className="flex h-screen w-full">
            <div className="m-auto text-center">
              <div>
                <CustomServerInput
                  roomInputRef={roomInputRef}
                  setRoom={setRoom}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
