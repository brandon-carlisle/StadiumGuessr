import { useRouter } from "next/router";

export default function MatchSummaryPage() {
  const router = useRouter();

  return <p>This is a summary page for match: {router.query.matchId}</p>;
}
