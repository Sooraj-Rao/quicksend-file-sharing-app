import { Analytics, Hero } from "@/components/component";
import { siteMetaData } from "@/data/siteMetaData";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Analytics />
      <Hero />
      <Footer />
    </Suspense>
  );
};

export default Page;

const Footer = () => (
  <p className="py-4 text-center text-xs sm:hidden">
    Developed By{" "}
    <a
      className=" text-muted-foreground font-semibold underline"
      href={siteMetaData.portfolio}
    >
      Sooraj
    </a>{" "}
  </p>
);
