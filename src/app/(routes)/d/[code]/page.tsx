"use client";

import { Button } from "@/components/ui/button";
import useVerifyAndDownload from "@/hook/VerifyAndDownload";
import { Loader } from "lucide-react";
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
      <div className=" flex gap-x-2">
        {!success && loader && <h1>Fetching File...</h1>}
        {loader && <Loader className=" animate-spin" />}
      </div>
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
