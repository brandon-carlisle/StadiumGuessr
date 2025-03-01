import { getHint } from "@/lib/utils";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IconBulb, IconZoomIn } from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function HintAndZoomControls() {
  const score = useAppSelector((state) => state.game.score);
  const team = useAppSelector((state) => state.game.currentTeam);
  const disatch = useAppDispatch();

  function onGetHint() {
    if (score > 0) {
      disatch(gameActions.decrementScore(1));
    }

    toast(getHint(team));
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" className="btn" onClick={onGetHint}>
        <IconBulb className="mr-2 h-4 w-4" />
        Hint (-1pt)
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => console.log("Reset zoom")}
      >
        <IconZoomIn className="mr-2 h-4 w-4" />
        Reset Zoom
      </button>
    </div>
  );
}
