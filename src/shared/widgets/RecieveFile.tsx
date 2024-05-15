"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SyntheticEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FetchFile } from "@/actions/get.file";

export function RecieveFile() {
  const [enteredCode, setEnteredCode] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { toast }: any = useToast();

  const handleSecretCodeSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!enteredCode)
      return toast({
        variant: "destructive",
        description: "Code cannot be empty",
      });
    if (enteredCode.length !== 6)
      return toast({
        variant: "destructive",
        description: `Code should ${
          enteredCode.length < 6 ? "be" : "not exceed"
        }  6 digit`,
      });

    if (!/^[0-9]*$/.test(enteredCode))
      return toast({
        variant: "destructive",
        description: "Only numbers allowed",
      });

    setLoader(true);
    try {
      const res = await FetchFile({ enteredCode });
      setEnteredCode('');
      if (res?.error && res?.message) {
        toast({
          variant: "destructive",
          description: res?.message,
        });
      }
      toast({
        variant: "success",
        description: 'Downloading has started..',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to download the file",
      });
    } finally {
      setLoader(false);
    }
  };


  return (
    <Card className="md:w-[350px] w-[90%]  sm:w-[60%]   shadow-lg shadow-black dark:border-slate-500">
      <CardHeader>
        <CardTitle className=" text-sm md:text-xl">Receive a File</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center mt-5">
        <form
          className="flex flex-col md:flex-row  gap-y-5 md:gap-y-0 w-full max-w-sm items-center space-x-2"
          onSubmit={handleSecretCodeSubmit}
        >
          <Input
            onChange={(e) => setEnteredCode(e.target.value)}
            value={enteredCode}
            type="text"
            placeholder="Enter 6 digit code"
            className=" border-slate-500 focus:border-transparent placeholder:font-normal tracking-wide placeholder:text-gray-500"
          />

          <Button type="submit" className=" gap-x-2 flex items-center">
            {loader ? (
              <h1 className=" h-4 w-4 border-2  dark:border-black border-t-transparent dark:border-t-transparent rounded-full animate-spin"></h1>
            ) : (
              <>
                <span>Download</span>
                <Download className=" h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
