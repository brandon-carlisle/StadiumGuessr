import { IconVolume, IconVolume3 } from "@tabler/icons-react";
import { useContext } from "react";
import { AudioContext } from "./audio-provider";

export function AudioToggle() {
  const { volume, setVolume } = useContext(AudioContext);

  const toggleAudio = () => {
    setVolume((prevVol) => (prevVol > 0 ? 0 : 0.6));
  };

  return (
    <button onClick={toggleAudio} className="btn" type="button">
      {volume ? <IconVolume /> : <IconVolume3 />}
    </button>
  );
}
