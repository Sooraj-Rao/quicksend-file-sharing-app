import { Analytics, Hero } from "@/components/component";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="  flex flex-col   min-h-screen">
      <Suspense
        fallback={
          <h1 className=" flex justify-center items-center ">Loading...</h1>
        }
      >
        <Analytics />
        <Hero />
      </Suspense>
    </div>
  );
};

export default Page;
