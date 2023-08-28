import React from "react";

interface MinimalProfileInfoProps {
  userPhoto: string;
  userDisplayName: string | null;
}

const MinimalProfileInfo: React.FC<MinimalProfileInfoProps> = ({
  userPhoto,
  userDisplayName,
}) => {
  return (
    <div className="flex items-center space-x-4 text-lg font-rubik text-[#FAF0E6]">
      <div>
        <img className="h-10 rounded-full drop-shadow-xl" src={userPhoto} />
      </div>
      <div className="font-bold drop-shadow-xl">{userDisplayName}</div>
    </div>
  );
};

export default MinimalProfileInfo;
