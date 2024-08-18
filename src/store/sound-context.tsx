import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: Dispatch<SetStateAction<boolean>>;
}

export const SoundContext = createContext<SoundContextType>({
  soundEnabled: true,
  setSoundEnabled: () => true,
});

interface Props {
  children: ReactNode;
}

export function SoundProvider({ children }: Props) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}
