import { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import SignUp from "./SignUp";
import Chat from "./Chat";
import Footer from "../components/Footer";
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
    <div className="text-center">
      <div className="right-0 fixed">
        <button className="font-robotomono p-6" onClick={signUserOut}>
          <svg
            className="fill-[#FAF0E6] text-2xl"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </button>
      </div>
      <div className="flex h-screen">
        <div className="m-auto text-center">
          {room ? (
            <Chat room={room} />
          ) : (
            <div>
              <div className="gap-12 flex sm:flex-row flex-col">
                <div className="flex flex-row sm:flex-col items-center">
                  <button
                    className="transition flex justify-center items-center sm:my-4 mx-6 hover:scale-110 h-[2em] w-[2em] rounded-full p-4 text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
                    onClick={() => {
                      setRoom("lounge");
                    }}
                  >
                    <svg
                      className="transition hover:scale-110 fill-[#FAF0E6] hover:fill-[#5C5470]"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <path d="M64 160C64 89.3 121.3 32 192 32H448c70.7 0 128 57.3 128 128v33.6c-36.5 7.4-64 39.7-64 78.4v48H128V272c0-38.7-27.5-71-64-78.4V160zM544 272c0-20.9 13.4-38.7 32-45.3c5-1.8 10.4-2.7 16-2.7c26.5 0 48 21.5 48 48V448c0 17.7-14.3 32-32 32H576c-17.7 0-32-14.3-32-32H96c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V272c0-26.5 21.5-48 48-48c5.6 0 11 1 16 2.7c18.6 6.6 32 24.4 32 45.3v48 32h32H512h32V320 272z" />
                    </svg>
                  </button>
                  <p className="font-robotomono text-[#B9B4C7]">Lounge</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center">
                  <button
                    className="transition flex justify-center items-center sm:my-4 mx-6 hover:scale-110 h-[2em] w-[2em] rounded-full p-4 text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
                    onClick={() => {
                      setRoom("arena");
                    }}
                  >
                    <svg
                      className="transition hover:scale-110 fill-[#FAF0E6] hover:fill-[#5C5470]"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M270.7 9.7C268.2 3.8 262.4 0 256 0s-12.2 3.8-14.7 9.7L197.2 112.6c-3.4 8-5.2 16.5-5.2 25.2v77l-144 84V280c0-13.3-10.7-24-24-24s-24 10.7-24 24v56 32 24c0 13.3 10.7 24 24 24s24-10.7 24-24v-8H192v32.7L133.5 468c-3.5 3-5.5 7.4-5.5 12v16c0 8.8 7.2 16 16 16h96V448c0-8.8 7.2-16 16-16s16 7.2 16 16v64h96c8.8 0 16-7.2 16-16V480c0-4.6-2-9-5.5-12L320 416.7V384H464v8c0 13.3 10.7 24 24 24s24-10.7 24-24V368 336 280c0-13.3-10.7-24-24-24s-24 10.7-24 24v18.8l-144-84v-77c0-8.7-1.8-17.2-5.2-25.2L270.7 9.7z" />
                    </svg>
                  </button>
                  <p className="font-robotomono text-[#B9B4C7]">Arena</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center">
                  <button
                    className="transition hover:scale-110 rounded-full p-4 sm:my-4 mx-6 flex justify-center items-center h-[2em] w-[2em] text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
                    onClick={() => {
                      setRoom("lab");
                    }}
                  >
                    <svg
                      className="transition hover:scale-110 fill-[#FAF0E6] hover:fill-[#5C5470]"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z" />
                    </svg>
                  </button>
                  <p className="font-robotomono text-[#B9B4C7]">Lab</p>
                </div>
              </div>
              <div className="my-20 bg-[#5C5470] rounded-full p-4 px-6 flex justify-center drop-shadow-xl">
                <input
                  className="w-full border-[#FAF0E6] border-r-[1px] mr-2 bg-[#5C5470] text-[#FAF0E6] placeholder:font-robotomono placeholder:text-[#B9B4C7] placeholder:px-2 outline-0 placeholder:text-sm"
                  placeholder="Enter room name ..."
                  type="text"
                  ref={roomInputRef}
                />
                <button
                  className="px-2"
                  onClick={() => {
                    if (roomInputRef.current) {
                      setRoom(roomInputRef.current.value);
                    }
                  }}
                >
                  <svg
                    className="fill-[#FAF0E6]"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
