"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDark = theme == "light" ? false : true;
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => (!isDark ? setTheme("dark") : setTheme("light"))}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </Button>
    </div>
  );
}
