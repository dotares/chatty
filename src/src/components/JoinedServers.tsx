import { SetRoomProps } from "../types/setRoomProps";

interface JoinedServersProps extends SetRoomProps {}

const JoinedServers: React.FC<JoinedServersProps> = ({ setRoom }) => {
  return (
    <div className="gap-12 flex sm:flex-row flex-col">
      <div className="flex flex-row sm:flex-col items-center">
        <button
          className="group transition flex justify-center items-center sm:my-4 mx-6 hover:scale-110 h-[2em] w-[2em] rounded-full p-4 text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
          onClick={() => {
            setRoom("Lounge");
          }}
        >
          <svg
            className="transition group-hover:scale-110 fill-[#FAF0E6] group-hover:fill-[#5C5470]"
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
          className="group transition flex justify-center items-center sm:my-4 mx-6 hover:scale-110 h-[2em] w-[2em] rounded-full p-4 text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
          onClick={() => {
            setRoom("Arena");
          }}
        >
          <svg
            className="transition group-hover:scale-110 fill-[#FAF0E6] group-hover:fill-[#5C5470]"
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
          className="group transition hover:scale-110 rounded-full p-4 sm:my-4 mx-6 flex justify-center items-center h-[2em] w-[2em] text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
          onClick={() => {
            setRoom("Lab");
          }}
        >
          <svg
            className="transition group-hover:scale-110 fill-[#FAF0E6] group-hover:fill-[#5C5470]"
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
  );
};

export default JoinedServers;
