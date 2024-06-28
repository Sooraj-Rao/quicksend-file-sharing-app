"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useVerifyAndDownload from "@/hook/VerifyAndDownload";

export function RecieveFile() {
  const [enteredCode, setEnteredCode] = useState<number | null>(null);
  const { fetchData, loader, success } = useVerifyAndDownload({
    code: enteredCode,
  });
  const { toast } = useToast();

  const handleSecretCodeSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetchData();
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) {
      toast({
        variant: "destructive",
        description: "Only numbers allowed",
      });
      return;
    }
    if (value.length > 6) {
      return;
    }
    const enteredValue = value === "" ? null : parseInt(value, 10);
    setEnteredCode(enteredValue);
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
