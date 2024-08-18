import { Volume2, VolumeX } from "lucide-react";
import { useContext } from "react";

import { SoundContext } from "@/store/sound-context";

export default function ToggleSound() {
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  const toggleSound = () => {
    setSoundEnabled((prevSoundEnabled) => !prevSoundEnabled);
  };

  return (
    <button onClick={toggleSound} className="btn">
      {soundEnabled ? <Volume2 /> : <VolumeX />}
    </button>
  );
}
