"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function RecieveFile() {
  const [enteredCode, setEnteredCode] = useState();
  const [dowloadUrl, setdowloadUrl] = useState({});
  const [loader, setloader] = useState(false);
  const { toast } = useToast();

  const handleDownloadFile = async ({ url, name }) => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name || "new file");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleSecretCodeSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const res = await axios.post("/api/validate", { enteredCode });
      console.log(res.data);

      const {
        error,
        file: { url, name },
        message,
      } = res.data;
      if (error) {
        return toast({
          variant: "destructive",
          description: message,
        });
      }

      if (url) {
        setdowloadUrl({ url, name });
        handleDownloadFile({ url, name });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Failed to validate the code",
      });
    } finally {
      setloader(false);
    }
  };

  return (
    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Recieve a File</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center mt-5">
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input
            onChange={(e) => {
              const enteredValue = e.target.value;
              if (/^[0-9]*$/.test(enteredValue)) {
                setEnteredCode(enteredValue);
              } else {
                toast({
                  variant: "destructive",
                  description: "Only numbers allowed",
                });
              }
            }}
            value={enteredCode}
            type="text"
            placeholder="Enter code"
          />

          <Button
          disabled={!enteredCode}
            type="submit"
            onClick={handleSecretCodeSubmit}
            className=" gap-x-2 flex items-center"
          >
            {loader ? (
              <h1 className=" h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></h1>
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
