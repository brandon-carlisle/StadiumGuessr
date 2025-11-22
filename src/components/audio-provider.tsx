import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useMemo, useState, useContext } from "react";

interface AudioContextType {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

export const AudioContext = createContext<AudioContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export function AudioProvider({ children }: Props) {
  const [volume, setVolume] = useState(0.6);

  const contextValue = useMemo(() => ({ volume, setVolume }), [volume]);

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

// hook for consuming the context safely
export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}

