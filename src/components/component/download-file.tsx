export const handleDownloadFile = async ({
  url,
  name,
}: {
  url: string;
  name: string;
}): Promise<{ error: boolean; message: string }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const dataUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.setAttribute("download", name || "downloaded_file");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => window.URL.revokeObjectURL(dataUrl), 100);

    return {
      error: false,
      message: `Downloading ${name || "file"}...`,
    };
  } catch (error) {
    console.error("Download failed:", error);
    return {
      error: true,
      message: "Download failed. Please try again.",
    };
  }
};
