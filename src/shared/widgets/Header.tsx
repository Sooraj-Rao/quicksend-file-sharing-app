import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import logo from "../../../public/image/logo-white.png";
import logoDark from "../../../public/image/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { AiOutlineBug } from "react-icons/ai";
import { SomeData } from "@/data/someData";

import { FaGithub } from "react-icons/fa";
const Header = () => {
  return (
    <div className=" flex justify-between px-4  items-center sm:px-10  py-3  shadow-slate-200 dark:shadow-none border-b-2  poppins-medium ">
      <Link
        href={"/"}
        className="scroll-m-20  flex items-center gap-x-3  w-full font-bold  pb-2 text-3xl  tracking-tight first:mt-0"
      >
        <Image
          src={logoDark}
          className="sm:h-7 h-5  sm:w-[11rem] w-[9rem] dark:hidden block"
          alt=""
        />
        <Image
          src={logo}
          className=" sm:h-7 h-5  sm:w-[11rem] w-[9rem] dark:block hidden "
          alt=""
        />
      </Link>
      <div className="  flex sm:gap-x-4 ">
        <a href={SomeData.contact} target="_blank">
          <Button
            variant="ghost"
            className=" py-2 px-4 rounded md:flex hidden items-center gap-x-3"
          >
            <AiOutlineBug size={20} />
            <span>Report an Issue</span>
          </Button>
        </a>
        <a href={SomeData.github} target="_blank">
          <Button
            variant="ghost"
            className=" py-2 px-4   rounded md:flex hidden items-center gap-x-1"
          >
            <FaGithub size={20} />
          </Button>
        </a>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
