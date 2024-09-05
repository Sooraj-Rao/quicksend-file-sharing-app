"use server";
import { redis } from "@/shared/libs/config/redis";

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
    const res: any = await redis.get(String(code));
    if (res) {
      return {
        message: "success",
        error: false,
        status: 200,
        file: { url: res?.file, name: res?.fileName },
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
