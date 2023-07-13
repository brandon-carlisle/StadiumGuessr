import type { Stadium } from "@prisma/client";

interface Props {
  correctStadiums: Stadium[];
  incorrectStadiums: Stadium[];
}

export default function AnswersOverview({
  correctStadiums,
  incorrectStadiums,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold md:text-3xl">How you answered</h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Correct Answers</h3>

        <div className="mt-2 space-y-2">
          {correctStadiums.map((stadium) => (
            <div
              key={stadium.id}
              className="rounded-md bg-green-200 px-4 py-2 capitalize text-green-800"
            >
              {stadium.names[0]}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Incorrect Answers</h3>

        <div className="mt-2 space-y-2">
          {incorrectStadiums.map((stadium) => (
            <div
              key={stadium.id}
              className="rounded-md bg-red-200 px-4 py-2 capitalize text-red-800"
            >
              {stadium.names[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
