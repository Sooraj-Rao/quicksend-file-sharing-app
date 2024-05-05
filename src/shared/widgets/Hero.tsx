"use client";
import React, { useState } from "react";
import { RecieveFile } from "./RecieveFile";
import ShareFIle from "./ShareFIle";

const Hero = () => {
  const [Operation, setOperation] = useState("none");
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold text-center my-20  tracking-tight lg:text-5xl">
        QuickSend: Connect and share, without limits.
      </h1>
      <div className=" flex justify-center gap-x-5">
        {Operation === "none" ? (
          <>
            <ShareFIle setOperation={setOperation} />
            <RecieveFile setOperation={setOperation} />
          </>
        ) : Operation === "upload" ? (
          <ShareFIle setOperation={setOperation} />
        ) : (
          <RecieveFile setOperation={setOperation} />
        )}
      </div>
    </div>
  );
};

export default Hero;
