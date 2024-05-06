"use client";

import { FetchFile } from "@/actions/get.file";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

const DownloadPageCode = ({
  params: { code },
}: {
  params: { code: string };
}) => {
  const [loader, setLoader] = useState(true);
  const FetchData = async () => {
    const res = await FetchFile({ enteredCode: code });
    setLoader(false);
    if (res?.error && res?.message) {
      toast({
        variant: "destructive",
        description: res?.message,
      });
    }
  };
  
  useEffect(() => {
    FetchData();
  }, [code]);

  return (
    <div className=" flex text-xl flex-col items-center  mt-32">
      {loader ? (
        <>
          <h1>Fetching Data from Server...</h1>
          <h1 className=" h-6 w-6 rounded-full mt-5 border border-t-transparent dark:border-t-transparent animate-spin  dark:border-white border-black"></h1>
        </>
      ) : (
        <Link href={"/"}>
          <Button>Go Home</Button>
        </Link>
      )}
    </div>
  );
};

export default DownloadPageCode;
