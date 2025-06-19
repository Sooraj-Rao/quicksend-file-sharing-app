"use client";

import React, { useState } from "react";
import { RecieveFile } from "./receive";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import ShareFile from "./share";
import { Footer } from "./footer";

export const Hero: React.FC = () => {
  const [operation, setOperation] = useState<"none" | "upload" | "receive">(
    "none"
  );

  return (
    <div className="container   mx-auto px-4 py-8 md:py-16">
      {operation === "none" && (
        <h1 className="text-2xl md:text-4xl  py-6 lg:text-5xl font-extrabold text-center mb-8 md:mb-16">
          Send Your Files without Hassle
        </h1>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        {operation === "none" ? (
          <>
            <OperationCard
              title="Share a File"
              description="Upload and share your files"
              icon={<Upload className="w-6 h-6" />}
              onClick={() => setOperation("upload")}
            />
            <OperationCard
              title="Receive a File"
              description="Download shared files using a code"
              icon={<Download className="w-6 h-6" />}
              onClick={() => setOperation("receive")}
            />
          </>
        ) : operation === "upload" ? (
          <ShareFile operation={operation} setOperation={setOperation} />
        ) : (
          <RecieveFile />
        )}
      </div>
      {operation !== "none" && (
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => setOperation("none")}>
            Back to Home
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

interface OperationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const OperationCard: React.FC<OperationCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <Card
      className="w-full max-w-sm  hover:bg-accent/70 bg-accent/30 cursor-pointer transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4">{icon}</div>
        <h2 className="  md:text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
