import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

export interface ResponseData {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    res.status(200).json({ message: "This was a POST REQUEST." });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Only POST requests are allowed." });
  }
}
