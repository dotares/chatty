import React from "react";
import { setSelectedImageProps } from "../types/setSelectedImageProps";

interface FileInputProps extends setSelectedImageProps {}

const FileInput: React.FC<FileInputProps> = ({ setSelectedImage }) => {
  return (
    <>
      <label
        id="myFile-label"
        className="bg-[#B9B4C7] p-2 transition hover:scale-110 rounded-full mr-6 drop-shadow-xl"
        htmlFor="myFile"
      >
        <svg
          className="fill-[#352F44]"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </label>
      <input
        id="myFile"
        className="hidden"
        name="myFile"
        type="file"
        onChange={(e: any) => {
          setSelectedImage(e.target.files[0]);
        }}
      />
    </>
  );
};

export default FileInput;
