import File from "@/models/file.model";
import { ConnectDb } from "@/shared/libs/config/db";
import { GenerateCode } from "@/shared/libs/generateCode";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ConnectDb();

  try {
    const { fileData, fileName } = req.body;

    const secretCode =GenerateCode();

    const saveData = await File.create({
      fileName,
      file: fileData,
      code: secretCode,
    });
    res.json({ code: saveData?.code, error: false });
  } catch (error) {
    res.json({ error: true, message: "Failed to generate code" });
  }
}
