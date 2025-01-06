// import type { Dispatch, ReactNode, SetStateAction } from "react";
// import { createContext, useMemo, useState } from "react";
//
// interface AudioContextType {
//   volume: number;
//   setVolume: Dispatch<SetStateAction<number>>;
// }
//
// export const AudioContext = createContext<AudioContextType>({
//   volume: 0.6,
//   setVolume: () => null,
// });
//
// interface Props {
//   children: ReactNode;
// }
//
// export function AudioProvider({ children }: Props) {
//   const [volume, setVolume] = useState(0.6); // Only manage volume
//
//   const contextValue = useMemo(
//     () => ({ volume, setVolume }), // Provide volume and setVolume
//     [volume, setVolume],
//   );
//
//   return (
//     <AudioContext.Provider value={contextValue}>
//       {children}
//     </AudioContext.Provider>
//   );
// }
//

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

  const contextValue = useMemo(
    () => ({ volume, setVolume }),
    [volume], // Removed setVolume from dependencies
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

// Custom hook for consuming the context safely
export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}
