"use client";

import { GetFile, Response } from "@/actions/getfile";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { handleDownloadFile } from "@/shared/widgets/DownloadFile";
import Link from "next/link";
import { useEffect, useState } from "react";

const DownloadPageCode = ({
  params: { code },
}: {
  params: { code: number };
}) => {
  const { toast }: any = useToast();
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);

  const FetchData = async () => {
    if (code === null)
      return toast({
        variant: "destructive",
        description: "Code cannot be empty",
      });
    if (code.toString().length !== 6)
      return toast({
        variant: "destructive",
        description: `Code should ${
          code.toString().length < 6 ? "be" : "not exceed"
        }  6 digits`,
      });

    setLoader(true);
    try {
      const res: Response = await GetFile({ code });
      const { error, message, file } = res;
      if (error)
        return toast({
          variant: "destructive",
          description: message,
        });
      if (file) {
        const { url, name } = file;
        const { error, message } = await handleDownloadFile({ url, name });
        toast({
          variant: error ? "destructive" : "default",
          description: message,
        });
        setSuccess(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to download the file",
      });
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    FetchData();
  }, [code]);

  return (
    <div className=" flex text-xl flex-col items-center  mt-32 min-h-60 ">
      {!success && loader && <h1>Fetching File...</h1>}
      <h1
        className={` h-6 w-6 rounded-full mt-5 border border-t-transparent dark:border-t-transparent animate-spin  dark:border-white border-black 
          ${loader ? "block" : "hidden"}
        `}
      ></h1>

      <>
        <div className={`  text-center block mb-10`}>
          <span className="  text-sm sm:hidden ">
            {success && "Check notification for downloading details!"}
          </span>
        </div>
        <Link href={"/"}>
          <Button>Go Home</Button>
        </Link>
      </>
    </div>
  );
};

export default DownloadPageCode;
