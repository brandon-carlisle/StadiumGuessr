import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    res.status(200).json({ message: "A response message" });

    const data = await prisma.match.create({ data: { score: 1, userId: "" } });
  }
}
