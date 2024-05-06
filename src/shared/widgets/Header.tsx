import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import logo from "../../../public/image/logo-white.png";
import logoDark from "../../../public/image/logo-black.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className=" flex justify-between items-center px-10 py-3  shadow-slate-200 dark:shadow-none border-b-2  poppins-medium ">
      <Link
        href={"/"}
        className="scroll-m-20  flex items-center gap-x-3  w-full font-bold  pb-2 text-3xl  tracking-tight first:mt-0"
      >
        <Image
          src={logoDark}
          className="h-7  w-[11rem] dark:hidden block"
          alt=""
        />
        <Image
          src={logo}
          className=" h-7  w-[11rem] dark:block hidden "
          alt=""
        />
      </Link>
      <div className="  flex gap-x-4 ">
        <ModeToggle />
        <a href={"https://github.com/Sooraj-Rao/Quicksend"} target="_blank">
          <Button
            variant="link"
            className=" py-2 px-4 border border-slate-400  dark:border-slate-800 rounded md:flex hidden items-center gap-x-1"
          >
            <Github />
            <span>Github</span>
          </Button>
        </a>
        <a href={"https://soorajrao.xyz"} target="_blank">
          <Button
            variant="link"
            className=" py-2 px-4 border  border-slate-400 dark:border-slate-800 rounded md:flex hidden items-center gap-x-1"
          >
            <ExternalLink />
            <span>Developer</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Header;
