"use client";
import { useRef, useState } from "react";
import { GetFile, Response } from "@/actions/getfile";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";

const useVerifyAndDownload = ({ code }: { code: number | null }) => {
  const [loader, setLoader] = useState(false);
  const { toast }: any = useToast();
  const [success, setSuccess] = useState(false);
  const hasFetchedData = useRef(false);
  const path = usePathname();
  const [Error, setError] = useState("");

  const fetchData = async () => {
    if (hasFetchedData.current) return;
    path.includes("/d/")
      ? (hasFetchedData.current = true)
      : (hasFetchedData.current = false);
    if (code === null) return setError("Code cannot be empty");

    const codeStr = code.toString();
    if (codeStr.length !== 6)
      return setError(
        `Code should ${
          code.toString().length < 6 ? "be" : "not exceed"
        } 6 digits`
      );

    if (!/^\d{6}$/.test(codeStr)) {
      setError("Code can only be numbers");
      return;
    }
    setLoader(true);
    try {
      const res: Response = await GetFile({ code });
      const { error, message, file } = res;
      if (error) setError(message);
      if (file) {
        const { url, name } = file;
        const link = document.createElement("a");
        link.href = url;
        link.download = name; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (error) {
          setError(message);
        } else {
          setSuccess(true);
          toast({
            variant: "default",
            description: message,
          });
        }
      }
    } catch (error) {
      setError("Failed to download the file");
    } finally {
      setLoader(false);
    }
  };

  return { fetchData, loader, success, Error };
};

export default useVerifyAndDownload;
