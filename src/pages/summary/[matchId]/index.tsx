import { useRouter } from "next/router";

import { api } from "@/utils/api";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MatchSummaryPage() {
  const router = useRouter();
  const { matchId } = router.query;

  const { data: match, isLoading } = api.match.getById.useQuery({
    matchId: matchId as string,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!match) return <p>Could not find that match...</p>;

  return <p>This is a summary page for match: {router.query.matchId}</p>;
}
