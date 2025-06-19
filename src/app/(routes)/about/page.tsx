"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IoMdMail } from "react-icons/io";
import { IoMdChatboxes } from "react-icons/io";
import { PiCursorClickFill } from "react-icons/pi";
import { siteMetaData } from "@/data/siteMetaData";
import { fetchData, useZustandStore } from "@/components/component";
import { MessageCircle } from "lucide-react";

function AboutPage() {
  const { Ref } = useZustandStore();

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicksend_about", "none");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-80px)]  ">
      <Card className="mb-2 border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className=" text-base ">About QuickLink</CardTitle>
        </CardHeader>
        <CardContent className="  text-muted-foreground">
          <p className=" mb-2">
            QuickSend is a lightweight file-sharing app that lets you send and
            receive files easily—no sign-ups or accounts required. Just upload a
            file, get a shareable link, and you&apos;re good to go. Anyone with the
            link can download the file, making the process quick and
            straightforward.
          </p>
          <p className="">
            Ideal for both casual sharing and quick team collaboration,
            QuickSend keeps things simple so you can focus on getting files
            where they need to go.
          </p>
        </CardContent>
      </Card>
      <hr className=" dark:border-foreground/20" />
      <Card className="mb-2 border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className=" text-base ">Features</CardTitle>
        </CardHeader>
        <CardContent className="  text-muted-foreground">
          <ul className="list-disc ml-5">
            <li>No login or authentication required</li>
            <li>Download files directly via shareable link</li>
            <li>Works across devices and platforms</li>
            <li>Clean, easy-to-use interface</li>
          </ul>
        </CardContent>
      </Card>

      <hr className=" dark:border-foreground/20" />
      <div className=" m-3  mt-6 flex gap-x-5  items-center">
        <span className="sm:text-sm text-xs">Get in touch</span>
        <a target="_blank" href={siteMetaData.contact}>
          <Button
            onClick={() => SendData("click_contact_about")}
            className="sm:text-sm text-xs flex gap-2 items-center"
          >
            <MessageCircle size={15} />
            Contact
          </Button>
        </a>
      </div>
    </div>
  );
}

export default AboutPage;
