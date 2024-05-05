"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeInput } from "@/components/CodeInput";
import { useEffect, useState } from "react";
import { filesize } from "filesize";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/shared/libs/config/firebase";
import axios from "axios";
import { Plus, Upload, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ShareFIle = ({ setOperation }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [width, setWidth] = useState(0);
  const [loader, setloader] = useState(false);
  const storage = getStorage(app);

  let progress;

  const handleUploadFile = async (downloadURL: any) => {
    if (!selectedFile || !downloadURL) return console.log("No file");
    try {
      const ReqData = {
        fileData: downloadURL,
        fileName: selectedFile?.name,
      };
      const res = await axios.post("/api/storefile", ReqData);
      console.log("Response from server:", res.data);
      setSecretCode(res.data.code);
      setUploadedFile(selectedFile);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const UploadFile = (file: any) => {
    setloader(true);
    try {
      const metadata = {
        contentType: file.type,
      };
      const storageRef = ref(storage, "file-upload/" + file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setWidth(progress == 0 ? 5 : progress);
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.log("Uploading failed!");

              break;
            case "storage/canceled":
              console.log("Uploading failed!");
              break;

            case "storage/unknown":
              console.log("Uploading failed!");
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Download Url", downloadURL);
            handleUploadFile(downloadURL);
            setloader(false);
          });
        }
      );
    } catch (error) {
      console.log("Uploading failed!", error);
      setloader(false);
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Share a File</CardTitle>
      </CardHeader>
      <CardFooter className=" flex flex-col ">
        {selectedFile ? (
          <>
            <div className=" border border-gray-800  w-full py-2 px-4 rounded ">
              <div className="flex justify-between items-center">
                <div>
                  <h1>{selectedFile?.name}</h1>
                  <span className=" text-sm">
                    {filesize(selectedFile?.size, { standard: "jedec" })}
                  </span>
                </div>
                <span
                  className={`${width == 0 ? "block" : "hidden"}`}
                  onClick={() => {
                    setSelectedFile("");
                    setOperation("none");
                    setWidth(0);
                  }}
                >
                  <X className=" hover:brightness-75 cursor-pointer" />
                </span>
              </div>
            </div>
            <div className=" my-3">
              {!loader && width == 0 && (
                <Button
                  onClick={() => UploadFile(selectedFile)}
                  className=" mt-5 gap-x-2 flex items-center"
                >
                  <span>Upload</span>
                  <Upload className=" h-4 w-4" />
                </Button>
              )}
              {loader ? (
                <div className=" w-full">
                  <Progress value={40} className=" min-w-60" />
                  {width}%
                </div>
              ) : (
                ""
              )}
              {!secretCode ? (
                width == 100 && <h1>Upload Succes</h1>
              ) : (
                <div className=" mt-6">
                  <h4 className=" text-sm">
                    Share this Secret code for the file access{" "}
                  </h4>
                  <h1 className=" text-xl text-center my-4">{secretCode}</h1>
                </div>
              )}
            </div>
          </>
        ) : (
          <label className="flex flex-col items-center border border-gray-800 rounded-md  w-full p-5 mx-auto mt-2 text-center  cursor-pointer ">
            <Plus />
            <p className="mt-2 text-xs tracking-wide text-gray-500 ">
              Upload or drag & drop your file
            </p>
            <input
              onChange={(e) => {
                setSelectedFile(e.target?.files[0]);
                setOperation("upload");
              }}
              type="file"
              className="hidden"
            />
          </label>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShareFIle;
