import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useMemo, useState } from "react";

interface AudioContextType {
  audioEnabled: boolean;
  setAudioEnabled: Dispatch<SetStateAction<boolean>>;
}

export const AudioContext = createContext<AudioContextType>({
  audioEnabled: true,
  setAudioEnabled: () => true,
});

interface Props {
  children: ReactNode;
}

export function AudioProvider({ children }: Props) {
  const [audioEnabled, setAudioEnabled] = useState(true);

  const contextValue = useMemo(
    () => ({ audioEnabled, setAudioEnabled }),
    [audioEnabled, setAudioEnabled],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}
