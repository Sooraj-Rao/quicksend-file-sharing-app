"use server";
import { redis } from "@/shared/libs/config/redis";
import { GenerateCode } from "@/shared/util/generateCode";

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
  try {
    // await redis.setex(short, 86400, JSON.stringify(long));
    const secretCode = GenerateCode();

    const res = await redis.set(
      JSON.stringify(secretCode),
      JSON.stringify({ file: fileData, fileName })
    );
    if (res == "OK")
      return { code: secretCode, error: false, message: "success" };

    return { error: true, message: "Internal server error" };
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};
