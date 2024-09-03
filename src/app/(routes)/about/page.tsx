"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IoMdMail } from "react-icons/io";
import { IoMdChatboxes } from "react-icons/io";
import { PiCursorClickFill } from "react-icons/pi";
import { siteMetaData } from "@/data/siteMetaData";

function AboutPage() {
  const SendData = (data: string) => {
    // fetchData(data, Ref || "search", "quicksend-about", "none");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-sm sm:text-base">
      <div className="mb-4 border-transparent">
        <CardHeader>
          <CardTitle className="text-base">About QuickSend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            QuickSend is a seamless and secure file-sharing app that lets you
            transfer files of any size quickly and easily. With advanced
            encryption, cross-platform compatibility, and lightning-fast
            uploads, QuickSend is designed to make file sharing simple and
            efficient.
          </p>
          <p className="">
            Whether {"you're"} a professional needing to send large files to
            clients or a casual user sharing photos and documents, QuickSend
            offers a reliable solution that fits your needs.
          </p>
        </CardContent>
      </div>
      <hr className="dark:border-foreground/20" />
      <div className="mb-4">
        <CardHeader>
          <CardTitle className="text-base">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Have any questions, feedback, or issues? {"We're"} here to assist
            you!
          </p>
          <div className="mt-6 flex space-x-4">
            <Button asChild variant="outline" className="flex gap-x-3">
              <a
                onClick={() => SendData("open-contact-us")}
                href={siteMetaData.contact + "quicksend_about"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoMdChatboxes className="h-5 w-5" />
                Contact Us
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
      <hr className="dark:border-foreground/20" />
      <div className="mb-4">
        <CardHeader>
          <CardTitle className="text-base">Socials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Connect with us on social media!</p>
          <div className="mt-6 flex space-x-4">
            <Button title="mail" asChild variant="outline" size="icon">
              <a
                onClick={() => SendData("open-mail")}
                href={siteMetaData.mail}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoMdMail className="h-5 w-5" />
              </a>
            </Button>
            <Button title="linkedin" asChild variant="outline" size="icon">
              <a
                onClick={() => SendData("open-linkedin")}
                href={siteMetaData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button title="portfolio" asChild variant="outline" size="icon">
              <a
                onClick={() => SendData("open-portfolio")}
                href={siteMetaData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PiCursorClickFill className="rotate-90 h-5 w-5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}

export default AboutPage;
