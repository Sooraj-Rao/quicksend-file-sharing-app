"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineBug } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosSend } from "react-icons/io";
import { ModeToggle } from "@/components/component/toggle-mode";
import { siteMetaData } from "@/data/siteMetaData";
import { useZustandStore } from "./zustand.store";
import { fetchData } from "./fetch-data";

export const Header = () => {
  const path = usePathname();
  const { Ref } = useZustandStore();

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicksend-header", "none");
  };

  return (
    <header className="flex justify-between sticky top-0  backdrop-blur  shadow-sm items-center px-4 sm:px-10 sm:py-4 py-2 dark:border-b border-b-foreground/20 sm:mt-0 dark:shadow-none z-50">
      <Link
        href="/"
        className="flex items-center gap-2 font-extrabold tracking-tight first:mt-0 hover:opacity-80 transition-opacity"
      >
        <IoIosSend className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-xl sm:text-3xl ">QuickSend</span>
      </Link>
      <nav className="flex items-center justify-end sm:gap-x-4">
        <Link
          href={"/"}
          className={`
        ${!path.includes("about") ? "hidden sm:block" : "block"}
        `}
        >
          <Button
            variant="ghost"
            className="py-2 px-4 text-xs sm:text-sm rounded flex items-center gap-x-3 "
          >
            <span>Home</span>
          </Button>
        </Link>
        <Link
          onClick={() => SendData("quicksend:about-page")}
          href={"/about"}
          className={`
          ${path.includes("about") ? "hidden sm:block" : "block"}
          `}
        >
          <Button
            variant="ghost"
            className="py-2 px-4 text-xs sm:text-sm rounded flex items-center gap-x-3"
          >
            <span>About</span>
          </Button>
        </Link>

        <a
          onClick={() => SendData("quicksend:report-issue-page")}
          href={siteMetaData.report + "quicksend_header"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            className="py-2 px-4 text-xs sm:text-sm rounded md:flex hidden items-center gap-x-2 "
          >
            <span>Report an Issue</span>
            <AiOutlineBug size={16} />
          </Button>
        </a>

        <ModeToggle />
      </nav>
    </header>
  );
};
