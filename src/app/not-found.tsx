"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className=" flex  justify-center items-center  h-[calc(100vh-4.2rem)]">
      <div>
        <h2 className="scroll-m-20  pb-2 text-5xl font-semibold tracking-tight first:mt-0">
          404 Page Not Found
        </h2>
        <p className=" mt-3 ">Maybe you&apos;ve clicked the wrong link.</p>
        <Link href={"/"}>
          <Button className=" mt-4">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
