"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ValidateAdmin } from "@/actions/isAdmin";
import { ArrowLeft } from "lucide-react";

export function Footer() {
  const [views, setViews] = useState<number | null>(null);

  const fetchViews = async () => {
    try {
      const isAdmin = await ValidateAdmin(Cookies.get("ref") || "");
      const res = await fetch(
        `https://viewcount.soorajrao.in/api/${
          isAdmin ? "test" : "quicksend website"
        }?svg=false`
      );
      const data = await res.json();
      if (data.success) setViews(data?.views);
    } catch (err) {}
  };

  useEffect(() => {
    fetchViews();
  }, []);

  return (
    <footer className=" mt-40 sm:flex-row flex-col   sm:gap-0 gap-4 flex items-center justify-around">
      <div className="bg-background cursor-default border hover:bg-accent/20 border-primary/10 rounded-md px-4 py-2 flex items-center space-x-3">
        <span className=" h-2 w-2 animate-pulse bg-primary rounded-full"></span>
        <div className="flex  items-center gap-x-3 dark:text-purple-300 text-purple-900 ">
          <span className="text-xs  text-foreground ">Site Views</span>
          <span className=" text-xs font-semibold ">
            {views && views.toLocaleString()}
          </span>
        </div>
      </div>
      <a
        target="_blank"
        href="https://soorajrao.in?ref=QuickSend"
        className="group  "
      >
        <p className=" text-sm  group-hover:scale-105 duration-200 flex items-center gap-x-2 ">
          Developed by
          <span className=" text-primary dark:text-purple-400 font-medium">Sooraj</span>
          <ArrowLeft className="h-4  w-4 text-foreground/50 sm:invisible hidden sm:block  sm:group-hover:visible rotate-[135deg]" />
        </p>
      </a>
    </footer>
  );
}
