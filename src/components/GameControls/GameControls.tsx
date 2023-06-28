import AnswerForm from "./AnswerForm";
import ResetZoom from "./ResetZoom";
import SkipControls from "./SkipControls";

export default function GameControls() {
  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-1">
      <AnswerForm />

      <div className="flex gap-2">
        <SkipControls />
        <ResetZoom />
      </div>
    </div>
  );
}
