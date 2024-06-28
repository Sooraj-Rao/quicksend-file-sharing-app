"use client";

import { Button } from "@/components/ui/button";
import useVerifyAndDownload from "@/hook/VerifyAndDownload";
import Link from "next/link";
import { useEffect } from "react";

const DownloadPageCode = ({
  params: { code },
}: {
  params: { code: number };
}) => {
  const { loader, success, fetchData } = useVerifyAndDownload({ code });

  useEffect(() => {
    fetchData();
  }, [code]);

  return (
    <div className="flex text-xl flex-col items-center mt-32 min-h-60">
      {!success && loader && <h1>Fetching File...</h1>}
      <h1
        className={`h-6 w-6 rounded-full mt-5 border border-t-transparent dark:border-t-transparent animate-spin dark:border-white border-black ${
          loader ? "block" : "hidden"
        }`}
      ></h1>

      <>
        <div className={`text-center block mb-10`}>
          <span className="text-sm sm:hidden">
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
