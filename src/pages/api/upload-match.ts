import type { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  message: string;
}

interface HandlerProps {
  req: NextApiRequest;
  res: NextApiResponse<ResponseData>;
}

export default function handler({ req, res }: HandlerProps) {
  const FAKE_RESPONSE = {
    message: "Hello from API.",
  };

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed." });
  } else {
    res.status(200).json(FAKE_RESPONSE);
  }
}
