"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Copy, File, Link, Loader, Upload, X } from "lucide-react";
import { filesize } from "filesize";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/shared/libs/config/firebase";
import { StoreFile } from "@/actions/store.file";
import { useZustandStore } from "./zustand.store";
import { fetchData } from "./fetch-data";
import { error } from "console";

type SelectedFile = Blob & {
  name: string;
  size: number;
  type: string;
};

type ShareFileProps = {
  setOperation: React.Dispatch<
    React.SetStateAction<"none" | "upload" | "receive">
  >;
  operation: string;
};

const URL = "https://quicksend.soorajrao.in";

export default function ShareFile({ setOperation, operation }: ShareFileProps) {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [secretCode, setSecretCode] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { Ref } = useZustandStore();

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicksend_share_file", "none");
  };

  const storage = getStorage(app);
  const { toast } = useToast();

  const handleUploadFile = async (downloadURL: string) => {
    SendData("quicksend:upload-file");
    if (!selectedFile || !downloadURL) {
      toast({
        variant: "destructive",
        description: "No file exists. Please re-upload the file.",
      });
      return;
    }

    try {
      const reqData = {
        fileData: downloadURL,
        fileName: selectedFile.name,
      };
      const res = await StoreFile(reqData);
      const { error, message, code } = res;
      if (error) {
        toast({
          variant: "destructive",
          description: message,
        });
      } else if (code) {
        setSecretCode(code);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Upload failed.Try after some time",
      });
    } finally {
      setUploadProgress(0);
    }
  };

  const uploadFile = (file: SelectedFile) => {
    setIsUploading(true);
    const metadata = { contentType: file.type };
    const storageRef = ref(storage, `file-upload/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setSelectedFile(null);
        toast({
          variant: "destructive",
          description: "Upload failed",
        });
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleUploadFile(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  const copyToClipboard = async (item: number | string) => {
    SendData("quicksend:copy-URL");
    if (item == null) return;
    const textToCopy = item.toString();
    await navigator.clipboard.writeText(textToCopy);
    const itemCopied = typeof item === "string" ? "URL" : "Code";
    toast({
      description: `${itemCopied} copied to the clipboard`,
    });
  };

  const resetState = () => {
    setSelectedFile(null);
    setOperation("upload");
    setSecretCode(null);
    setUploadProgress(0);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="sm:text-2xl text-xl font-bold">
          Share a File
        </CardTitle>
        <CardDescription>Upload and share your file securely</CardDescription>
      </CardHeader>
      <CardContent>
        {!selectedFile ? (
          <FileUploader
            onFileSelect={setSelectedFile}
            setOperation={setOperation}
          />
        ) : (
          <FileDetails
            file={selectedFile}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            secretCode={secretCode}
            onUpload={() => uploadFile(selectedFile)}
            onCopy={copyToClipboard}
            onReset={resetState}
          />
        )}
      </CardContent>
    </Card>
  );
}

function FileUploader({
  onFileSelect,
  setOperation,
}: {
  onFileSelect: (file: SelectedFile) => void;
  setOperation: React.Dispatch<
    React.SetStateAction<"none" | "upload" | "receive">
  >;
}) {
  return (
    <div className="flex items-center justify-center w-full">
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 bg-accent hover:bg-accent/80"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Any file up to 10MB
          </p>
        </div>
        <Input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files) return;
            onFileSelect(files[0] as SelectedFile);
            setOperation("upload");
          }}
        />
      </Label>
    </div>
  );
}

function FileDetails({
  file,
  uploadProgress,
  isUploading,
  secretCode,
  onUpload,
  onCopy,
  onReset,
}: {
  file: SelectedFile;
  uploadProgress: number;
  isUploading: boolean;
  secretCode: number | null;
  onUpload: () => void;
  onCopy: (item: number | string) => void;
  onReset: () => void;
}) {
  const getDisplayName = (file: any) => {
    const { name } = file;
    if (name.length > 20) {
      const baseName = name.slice(0, 16);
      const extension = name.slice(-8);
      return (
        <div>
          {baseName}..
          <br className=" sm:hidden" />
          {extension}
        </div>
      );
    }
    return name;
  };

  const [loading, setLoading] = useState(false);
  const [ShortURL, setShortURL] = useState("");

  const ShortenUrl = async (url: string) => {
    const apiKey = "quklnk_OQPmKajmPrjrsRGIuVzmVDtk";
    setLoading(true);
    fetch("https://sj1.xyz/api", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long: url }),
    })
      .then((response) => response.json())
      .then((result) => {
        const {
          data: { shortUrl },
        } = result;
        if (shortUrl) {
          setShortURL(shortUrl);
        } else {
          setShortURL(url);
        }
      })
      .catch(() => {
        setShortURL(url);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4  bg-accent rounded-lg">
        <div className="flex items-center space-x-3">
          <File className="w-8 h-8 text-foreground/50" />
          <div>
            <p className="font-medium  break-words">{getDisplayName(file)}</p>
            <p className="text-sm text-gray-500">
              {filesize(file.size, { standard: "jedec" })}
            </p>
          </div>
        </div>
        {!secretCode && (
          <Button
            disabled={isUploading}
            variant="ghost"
            size="icon"
            onClick={onReset}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {!isUploading && !secretCode && uploadProgress == 0 && (
        <Button
          onClick={onUpload}
          disabled={secretCode ? true : false}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      )}

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <div className=" flex items-center justify-center gap-x-2 mt-2">
            <p className="text-sm text-center">
              {uploadProgress.toFixed(0) == "0"
                ? "Uploading.."
                : `${uploadProgress.toFixed(0)}% Uploaded`}
            </p>
            <Loader size={16} className=" animate-spin" />
          </div>
        </div>
      )}
      {secretCode ? (
        <div className="space-y-4 ">
          <div className="p-4  bg-green-100 dark:bg-green-950 rounded-lg">
            <p className="text-green-950  text-sm sm:text-base dark:text-green-200 font-medium">
              Successfully uploaded the file
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secret-code">Secret Code</Label>
            <div className="flex space-x-2">
              <Input id="secret-code" value={secretCode} readOnly />
              <Button className=" scale-90" onClick={() => onCopy(secretCode)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="share-url">Share URL</Label>
            <div className="flex space-x-2">
              {ShortURL ? (
                <>
                  <Input id="share-url" value={ShortURL} readOnly />
                  <Button
                    className=" scale-90"
                    onClick={() => onCopy(`${URL}/d/${secretCode}`)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </>
              ) : (
                <Button
                  disabled={loading}
                  className=" flex gap-x-2 sm:scale-90"
                  onClick={() => ShortenUrl(`${URL}/d/${secretCode}`)}
                >
                  {loading ? (
                    <>
                      Generating...
                      <Loader size={14} className=" animate-spin" />
                    </>
                  ) : (
                    "Generate URL"
                  )}
                  {!loading && <Link size={15} />}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        uploadProgress === 100 &&
        !isUploading && (
          <h1 className=" flex items-center gap-x-2">
            Generating code..
            <Loader size={20} className=" animate-spin" />
          </h1>
        )
      )}
    </div>
  );
}
