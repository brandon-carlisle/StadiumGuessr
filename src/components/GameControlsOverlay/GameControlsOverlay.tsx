import AnswerForm from "./AnswerForm";
import ResetZoom from "./ResetZoom";
import SkipControls from "./SkipControls";

export default function GameControlsOverlay() {
  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex w-full -translate-x-1/2 flex-col items-center justify-center gap-1 px-2 md:px-0">
      <AnswerForm />

      <div className="flex gap-2">
        <SkipControls />
        <ResetZoom />
      </div>
    </div>
  );
}
