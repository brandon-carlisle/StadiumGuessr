import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useMemo, useState } from "react";

interface AudioContextType {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

export const AudioContext = createContext<AudioContextType>({
  volume: 0.6,
  setVolume: () => null,
});

interface Props {
  children: ReactNode;
}

export function AudioProvider({ children }: Props) {
  const [volume, setVolume] = useState(0.6); // Only manage volume

  const contextValue = useMemo(
    () => ({ volume, setVolume }), // Provide volume and setVolume
    [volume, setVolume],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}
