import File from "@/models/file.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { enteredCode: code } = req.body;

    const findFile = await File.findOne({ code });
    if (findFile) {
      res.json({
        error: false,
        file: { url: findFile?.file, name: findFile?.fileName },
      });
    } else {
      res.json({
        error: true,
        message: "The Code is Invalid or Expired",
        file: { url: null, name: null },
      });
    }
  } catch (error) {
    console.log(error);

    res.json({ error: true, message: "Failed to validate code" });
  }
}
