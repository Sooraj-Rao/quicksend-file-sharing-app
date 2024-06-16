"use client";

import { FetchFile } from "@/actions/get.file";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

const DownloadPageCode = ({
  params: { code },
}: {
  params: { code: string };
}) => {
  const { toast }: any = useToast();
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);

  const FetchData = async () => {
    const enteredCode = code;
    if (
      !enteredCode ||
      !/^[0-9]*$/.test(enteredCode) ||
      enteredCode?.length !== 6
    ) {
      setLoader(false);
      return toast({
        variant: "destructive",
        description: "Code or URL is Invalid",
      });
    }

    const res = await FetchFile({ enteredCode: code });
    setLoader(false);

    if (res?.error && res?.message) {
      return toast({
        variant: "destructive",
        description: res?.message,
      });
    }
    toast({
      variant: "success",
      description: "Downloading has started..",
    });
    setSuccess(true);
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
