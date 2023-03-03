import { useEffect, useState } from "react";
import { ResponseData } from "../pages/api/upload-match";
import { type MatchData } from "../pages/play";

interface UseFetchApiRes {
  data: any;
  error: any;
  loading: boolean;
}

export default function useFetch(
  url: string,
  matchData: MatchData
): UseFetchApiRes {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const options = {
    method: "POST",
    body: JSON.stringify(matchData),
  };

  async function fetchData() {
    setLoading(true);

    const response = await fetch(url, options);
  }

  useEffect(() => {
    void fetchData();
  }, [url]);

  return { data, error, loading };
}
