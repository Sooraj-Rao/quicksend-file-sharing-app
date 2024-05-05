import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Header = () => {
  return (
    <div className=" flex justify-between items-center px-10 py-3  shadow-slate-200 dark:shadow-none border-b-2  poppins-medium ">
      <div>
        LOGO
      </div>
      {/* //   <div>
    //     <Link to={"/"}>
    //       <h2 className="scroll-m-20  h-10 font-bold  pb-2 text-3xl  tracking-tight first:mt-0">
    //         <img src={logo} className=" h-full dark:hidden block" alt="" />
    //         <img src={logoDark} className=" h-full dark:block hidden " alt="" />
    //       </h2>
    //     </Link>
    //   </div> */}
      <div className="  flex gap-x-4 ">
        <ModeToggle />
        <a href={'https://github.com/Sooraj-Rao'} target="_blank">
          <Button
            variant="link"
            className=" py-2 px-4 border border-slate-400  dark:border-slate-800 rounded md:flex hidden items-center gap-x-1"
          >
            <Github />
            <span>Github</span>
          </Button>
        </a>
        <a href={'https://soorajrao.xyz'} target="_blank">
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
