import redis from "redis";
import { NextRequest, NextResponse } from "next/server";

const client = redis.createClient();

export default function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    try {
      const token: number = Math.floor(Math.random() * 1000000);
      const { fileData } = req.body;
      const expirationTimeInSeconds = 3600;

      client.setex(token, expirationTimeInSeconds, fileData);

      Response.json({ token, error: false });
    } catch (error) {
      Response.json({ error: true, message: "Failed" });
    }
  } else {
    res.status(405);
  }
}
