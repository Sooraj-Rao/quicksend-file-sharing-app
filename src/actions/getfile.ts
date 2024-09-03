"use server";
import File from "@/models/file.model";
import { ConnectDb } from "@/shared/libs/config/db";

export type Response = {
  error: boolean;
  message: string;
  file?: { url: string; name: string };
  status?: number;
};

export const GetFile = async ({
  code,
}: {
  code: number;
}): Promise<Response> => {
  try {
    await ConnectDb();
    const findFile = await File.findOne({ code });
    if (findFile) {
      return {
        message: "success",
        error: false,
        status: 200,
        file: { url: findFile?.file, name: findFile?.fileName },
      };
    } else {
      return {
        error: true,
        status: 404,
        message: "The Code is Invalid or Expired",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, error: true, message: "Internal server error" };
  }
};
