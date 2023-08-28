import { Dispatch, SetStateAction } from "react";

export interface SetRoomProps {
  setRoom: Dispatch<SetStateAction<string | null>>;
}
