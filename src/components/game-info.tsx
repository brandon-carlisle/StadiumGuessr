import { Card } from "./card";

export function GameInfo() {
  return <Card className="p-4">
    <h2 className="text-xl font-bold mb-2">Game Info</h2>
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">Score:</span>
      <span className="text-2xl">1250</span>
    </div>
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">Time Remaining:</span>
      <span className="text-2xl">2:30</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-semibold">Questions Remaining:</span>
      <span className="text-2xl">5</span>
    </div>
  </Card>
}
