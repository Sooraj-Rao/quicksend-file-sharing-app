"use client";
import axios from "axios";
import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/shared/libs/config/firebase";
import Hero from "@/shared/widgets/Hero";

const Page = () => {




  
  return (
    <div>
      <Hero/>
      {/* <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={() => UploadFile(selectedFile)}>Upload</button>
      </div>
      {secretCode && (
        <div>
          <p>Share this secret code: {secretCode}</p>
        </div>
      )}
      <div>
        <form onSubmit={handleSecretCodeSubmit}>
          <input
            type="text"
            placeholder="Enter secret code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
          />
          <button type="submit">Download</button>
        </form>
      </div> */}
    </div>
  );
};

export default Page;
