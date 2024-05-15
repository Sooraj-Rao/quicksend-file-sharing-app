"use client";
import React, { useState } from "react";
import { RecieveFile } from "./RecieveFile";
import ShareFIle from "./ShareFIle";
const Hero: React.FC = () => {
  const [Operation, setOperation] = useState<string>("none");
  return (
    <div>
      {Operation == "none" ? (
        <h1 className="sm:scroll-m-20 md:text-4xl mx-3 text-2xl font-bold text-center sm:my-20 my-10  tracking-tight lg:text-5xl">
          QuickSend: Connect and share, without limits.
        </h1>
      ) : (
        ""
      )}
      <div
        className={`flex md:flex-row flex-col items-center gap-y-5 md:gap-y-0 mb-10 md:mb-0  md:items-stretch justify-center gap-x-5
      ${Operation != "none" ? "mt-20" : "mt-0"}
      `}
      >
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
