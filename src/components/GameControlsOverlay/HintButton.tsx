import toast from "react-hot-toast";

import { useAppSelector } from "@/store/hooks";

export default function HintButton() {
  const { currentStadium } = useAppSelector((state) => state.game);

  // getHint will use current stadium and give random facts
  const getHint = () => {
    toast(`${currentStadium.club ?? ""}`);
  };

  return (
    <button
      className="btn-secondary btn-sm join-item btn md:btn-md"
      onClick={getHint}
    >
      Get hint
    </button>
  );
}
