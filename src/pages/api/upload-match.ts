import type { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.body);

  if (req.method === "POST") {
    res.status(200).json({ message: "Hello from API." });
  } else {
    res.status(405).json({ message: "Only POST requests are allowed." });
  }
}
