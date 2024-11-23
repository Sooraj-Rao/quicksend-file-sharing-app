"use client";
import { useRef, useState } from "react";
import { GetFile, Response } from "@/actions/getfile";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { handleDownloadFile } from "@/components/component";

const useVerifyAndDownload = ({ code }: { code: number | null }) => {
  const [loader, setLoader] = useState(false);
  const { toast }: any = useToast();
  const [success, setSuccess] = useState(false);
  const hasFetchedData = useRef(false);
  const path = usePathname();

  const fetchData = async () => {
    if (hasFetchedData.current) return;
    path.includes("/d/")
      ? (hasFetchedData.current = true)
      : (hasFetchedData.current = false);
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
        } 6 digits`,
      });
    if (isNaN(Number(code))) {
      return toast({
        variant: "destructive",
        description: "Code can only be numbers",
      });
    }
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
        !error && setSuccess(true);
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

  return { fetchData, loader, success };
};

export default useVerifyAndDownload;
