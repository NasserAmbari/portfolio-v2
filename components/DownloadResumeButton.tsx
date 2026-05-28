"use client";

import RevealText from "@/components/ui/RevealText";

const DownloadResumeButton = () => {
  const handleDownloadResume = () => {
    window.open("/CV_Ahmad Nasser Ambari.pdf", "_blank");
  };

  return (
    <button
      onClick={handleDownloadResume}
      className="self-start text-sm md:text-md w-52 mx-auto"
    >
      <div className="flex items-center justify-center mx-auto text-xl">
        <RevealText text={`Download Resume ➜]`} />
      </div>
    </button>
  );
};

export default DownloadResumeButton;
