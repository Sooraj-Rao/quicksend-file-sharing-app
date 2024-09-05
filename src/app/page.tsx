import { Analytics, Hero } from "@/components/component";
import { siteMetaData } from "@/data/siteMetaData";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="  flex flex-col min-h-screen">
      <Suspense
        fallback={
          <h1 className=" flex justify-center items-center ">Loading...</h1>
        }
      >
        <Analytics />
        <Hero />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Page;

const Footer = () => (
  <footer className="py-4 text-center text-xs mt-auto">
    Developed By{" "}
    <a
      className="text-muted-foreground font-semibold underline"
      href={siteMetaData.portfolio}
    >
      Sooraj
    </a>
  </footer>
);
