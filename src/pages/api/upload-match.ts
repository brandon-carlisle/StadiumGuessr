import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

// Find better way to do this
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    score: number;
    user: string;
  };
}

export interface ResponseData {
  message: string;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    res.status(200).json({ message: "Hello from API." });

    const { score, user } = req.body;

    try {
      await prisma.match.create({
        data: { score, userId: user },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(405).json({ message: "Only POST requests are allowed." });
  }
}

// TODO:
// 1) Get the user from the body FIXED
// 2) Use prisma to update that users Matches with new match FIXED
// 3) Redirect to ('/leaderboard or /scores')
