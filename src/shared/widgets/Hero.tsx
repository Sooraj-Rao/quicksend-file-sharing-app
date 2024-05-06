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
            <ShareFIle Operation={Operation} setOperation={setOperation} />
            <RecieveFile />
          </>
        ) : Operation === "upload" ? (
          <ShareFIle Operation={Operation} setOperation={setOperation} />
        ) : (
          <RecieveFile />
        )}
      </div>
    </div>
  );
};

export default Hero;
