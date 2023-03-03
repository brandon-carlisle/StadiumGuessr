import { useEffect, useState } from "react";

interface UseFetchApiRes {
  data: any;
  error: any;
  loading: boolean;
}

export default function useFetch(url: string): UseFetchApiRes {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("hey");
  }, [url]);

  return { data, error, loading };
}
