import AnswerForm from './AnswerForm';
import ResetZoom from './ResetZoom';

export default function GameControls() {
  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-1">
      <AnswerForm />
      <div className="flex gap-2">
        <ResetZoom />
        {/* <SkipControls
          questions={GAME_QUESTIONS}
          setInputText={setInputText}
          handleNextTeam={handleNextTeam}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        /> */}
      </div>
    </div>
  );
}
