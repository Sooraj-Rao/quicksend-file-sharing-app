"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GetFile, Response } from "@/actions/getfile";
import { handleDownloadFile } from "./DownloadFile";

export function RecieveFile() {
  const [enteredCode, setEnteredCode] = useState<number | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSecretCodeSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (enteredCode === null)
      return toast({
        variant: "destructive",
        description: "Code cannot be empty",
      });
    if (enteredCode.toString().length !== 6)
      return toast({
        variant: "destructive",
        description: `Code should ${
          enteredCode.toString().length < 6 ? "be" : "not exceed"
        }  6 digits`,
      });

    setLoader(true);
    try {
      const res: Response = await GetFile({ code: enteredCode });
      const { error, message, file } = res;
      if (error)
        return toast({
          variant: "destructive",
          description: message,
        });
      if (file) {
        setEnteredCode(null);
        const { url, name } = file;
        const { error, message } = await handleDownloadFile({ url, name });
        toast({
          variant: error ? "destructive" : "default",
          description: message,
        });
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

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEnteredCode(value ? parseInt(value, 10) : null);
  };

  return (
    <Card className="md:w-[400px] w-[90%] sm:w-[60%] shadow-lg shadow-black dark:border-slate-500">
      <CardHeader>
        <CardTitle className="text-sm md:text-xl">Receive a File</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center mt-5">
        <form
          className="flex flex-col md:flex-row gap-y-5 md:gap-y-0 w-full max-w-sm items-center space-x-2"
          onSubmit={handleSecretCodeSubmit}
        >
          <Input
            onChange={handleCodeChange}
            value={enteredCode ?? ""}
            type="text"
            placeholder="Enter 6 digit code"
            className="border-slate-500 focus:border-transparent placeholder:font-normal tracking-wide placeholder:text-gray-500"
          />

          <Button type="submit" className="gap-x-2 flex items-center">
            {loader ? (
              <h1 className="h-4 w-4 border-2 dark:border-black border-t-transparent dark:border-t-transparent rounded-full animate-spin"></h1>
            ) : (
              <>
                <span>Download</span>
                <Download className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
