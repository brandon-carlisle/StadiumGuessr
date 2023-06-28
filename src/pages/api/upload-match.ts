import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@server/db";

// Find better way to do this
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    score: number;
    user: string;
  };
}

export interface ResponseData {
  message?: "completed" | "failed";
  error?: string;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "POST") {
    const { score, user } = req.body;

    try {
      if (score > 0) {
        await prisma.match.create({
          data: { score, userId: user },
        });
      }

      res.status(200).json({ message: "completed" });
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  } else {
    res.status(405).json({ error: "Request must be a POST" });
  }
}
