import { IconVolume, IconVolume3 } from "@tabler/icons-react";
import { useContext } from "react";
import { AudioContext } from "./audio-provider";

export function AudioToggle() {
  const { audioEnabled, setAudioEnabled } = useContext(AudioContext);

  const toggleAudio = () => {
    setAudioEnabled((prevAudioEnabled) => !prevAudioEnabled);
  };

  return (
    <button onClick={toggleAudio} className="btn" type="button">
      {audioEnabled ? <IconVolume /> : <IconVolume3 />}
    </button>
  );
}
