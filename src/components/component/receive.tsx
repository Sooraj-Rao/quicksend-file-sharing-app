"use client";

import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { handleDownloadFile } from "./download-file";
import { GetFile } from "@/actions/getfile";
import { fetchData } from "./fetch-data";
import { useZustandStore } from "./zustand.store";

const STATUS = {
  IDLE: "idle",
  VERIFYING: "verifying",
  DOWNLOADING: "downloading",
  SUCCESS: "success",
  ERROR: "error",
  INVALID: "invalid",
  EXPIRED: "expired",
};

export function RecieveFile() {
  const [enteredCode, setEnteredCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string>(STATUS.IDLE);
  const { Ref } = useZustandStore();

  const handleError = (status: string, errorMessage: string) => {
    setDownloadStatus(status);
    setIsLoading(false);
  };

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicksend_recieve_file", "none");
  };

  const handleSecretCodeSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (enteredCode.length !== 6) {
      handleError(STATUS.INVALID, "Code should be exactly 6 digits");
      return;
    }
    SendData("quicksend:recive-file-clicked");
    setIsLoading(true);
    setDownloadStatus(STATUS.VERIFYING);

    try {
      const { error, message, file, status } = await GetFile({
        code: Number(enteredCode),
      });

      if (status === 500) {
        handleError(STATUS.ERROR, "Server error. Please try again.");
        return;
      }

      if (!file?.name || !file?.url || status === 404) {
        handleError(STATUS.EXPIRED, "Code is invalid or expired");
        return;
      }

      setDownloadStatus(STATUS.DOWNLOADING);
      const downloadResult = await handleDownloadFile({
        url: file.url,
        name: file.name,
      });

      if (downloadResult.error) {
        throw new Error(downloadResult.message);
      }

      setDownloadStatus(STATUS.SUCCESS);
    } catch (error) {
      handleError(
        STATUS.ERROR,
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value) || value.length > 6) {
      return;
    }
    setEnteredCode(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Receive a File</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSecretCodeSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              onChange={handleCodeChange}
              value={enteredCode}
              type="text"
              placeholder="Enter 6-digit code"
              className="text-center text-xl tracking-widest"
              maxLength={6}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || enteredCode.length !== 6}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {
              {
                [STATUS.IDLE]: "Download File",
                [STATUS.VERIFYING]: "Verifying Code...",
                [STATUS.DOWNLOADING]: "Downloading...",
                [STATUS.SUCCESS]: "Download Complete",
                [STATUS.ERROR]: "Try Again",
                [STATUS.INVALID]: "Try Again",
                [STATUS.EXPIRED]: "Try Again",
              }[downloadStatus]
            }
          </Button>
        </form>
      </CardContent>
      <CardFooter
        className={`text-center text-sm text-muted-foreground
      ${
        (downloadStatus == STATUS.EXPIRED ||
          downloadStatus == STATUS.ERROR ||
          downloadStatus == STATUS.INVALID) &&
        " text-red-400"
      }
      ${downloadStatus == STATUS.SUCCESS && " text-green-400"}
      `}
      >
        {
          {
            [STATUS.IDLE]: "Enter the 6-digit code to download file",
            [STATUS.SUCCESS]: "File downloaded successfully!",
            [STATUS.ERROR]: "An error occurred. Please try again.",
            [STATUS.INVALID]: "Code should be exactly 6 digits",
            [STATUS.EXPIRED]: "Code is invalid or expired",
          }[downloadStatus]
        }
      </CardFooter>
    </Card>
  );
}
