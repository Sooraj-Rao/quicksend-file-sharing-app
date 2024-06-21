"use server";
import File from "@/models/file.model";
import { ConnectDb } from "@/shared/libs/config/db";
import { GenerateCode } from "@/shared/libs/generateCode";

export type Response = {
  error: boolean;
  message: string;
  code?: number;
};

export type Params = {
  fileData: string;
  fileName: string;
};

export const StoreFile = async ({
  fileData,
  fileName,
}: Params): Promise<Response> => {
  await ConnectDb();

  try {
    const secretCode = GenerateCode();

    const saveData = await File.create({
      fileName,
      file: fileData,
      code: secretCode,
    });
    return { code: saveData?.code, error: false, message: "success" };
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};
