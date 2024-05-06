import axios from "axios";

export const FetchFile = async ({ enteredCode }: { enteredCode: string }) => {
  try {
    console.log(enteredCode);
    
    const res = await axios.post("/api/validate", { enteredCode });
    
    const { error, message } = res.data;
    if (error) {
      return { error: true, message };
    }
    const {
      file: { url, name },
    } = res.data;

    if (url) {
      handleDownloadFile({ url, name });
    }
  } catch (error) {
    console.log(error);
    return { error: true, message: "Failed to get file" };
  }
};

const handleDownloadFile = async ({
  url,
  name,
}: {
  url: string;
  name: string;
}) => {
  try {
    const blob = new Blob([url]);
    const dataUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.setAttribute("download", name || "new file");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    return { error: true, message: "Failed to get file" };
  }
};
