import { getSession } from "@/shared/libs/config/get-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req, res);
    const { fileData: file } = req?.body;
    const token = Math.floor(Math.random() * 1000000);
    session.file = session.file
      ? session.file
      : {
          file,
          token,
        };
    console.log(session.file);

    res.json({ token: session?.file.token });
  } catch (error) {
    console.log(error);

    res.json({ error: error });
  }
}
