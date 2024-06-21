export const handleDownloadFile = async ({
  url,
  name,
}: {
  url: string;
  name: string;
}) => {
  try {
    const response = await fetch(url);

    const blob = await response.blob();
    const dataUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.setAttribute("download", name || "new_file");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return {
      error: false,
      message: "Downloading has started...",
    };
  } catch (error) {
    return {
      error: true,
      message: "Download failed",
    };
  }
};
