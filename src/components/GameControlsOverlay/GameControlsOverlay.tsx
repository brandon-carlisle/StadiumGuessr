import AnswerForm from "./AnswerForm";
import HintButton from "./HintButton";
import ResetZoomButton from "./ResetZoom";
import SkipButton from "./SkipControls";

export default function GameControlsOverlay() {
  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex w-full -translate-x-1/2 flex-col items-center justify-center gap-1 px-2 md:px-0">
      <AnswerForm />

      <div className="join">
        <SkipButton />
        <HintButton />
        <ResetZoomButton />
      </div>
    </div>
  );
}
