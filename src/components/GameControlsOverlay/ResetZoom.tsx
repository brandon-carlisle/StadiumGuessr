import { resetZoom } from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";

export default function ResetZoomButton() {
  const dispatch = useAppDispatch();

  function handleResetZoom() {
    dispatch(resetZoom());
  }

  return (
    <button
      className="btn-neutral btn-sm join-item btn md:btn-md"
      onClick={handleResetZoom}
    >
      Reset Zoom
    </button>
  );
}
