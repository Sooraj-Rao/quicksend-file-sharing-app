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
  const { loader, success, fetchData, Error } = useVerifyAndDownload({ code });
  useEffect(() => {
    fetchData();
  }, [code]);

  return (
    <div className="flex text-xl flejx-col  items-center justify-center  mt-32">
      <div className=" flex gap-x-2">
        {!success && loader && <h1>Fetching File...</h1>}
        {loader && <Loader className=" animate-spin" />}
      </div>
      <>
        <div className={`text-center block mb-10`}>
          <span className="text-sm sm:hidden">
            {success && "Check notification for downloading details!"}
          </span>
          <p className="text-xl sm:block hidden">
            {success && "File download was successful!"}
          </p>
          {Error && <p className=" text-red-500 sm:text-xl sm:block hidden">{Error}</p>}
        </div>
        <Link href={"/"}>
          <Button>Go Home</Button>
        </Link>
      </>
    </div>
  );
};

export default DownloadPageCode;
