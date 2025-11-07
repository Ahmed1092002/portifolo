"use client";
import { useCallback, useState } from "react";
import { RESUME_LINK_PDF } from "../constants";
import { triggerFileDownload, DownloadStatus } from "../utils/triggerDownload";

export function useResumeDownload(url: string = RESUME_LINK_PDF) {
  const [status, setStatus] = useState<DownloadStatus | "idle">("idle");

  const startDownload = useCallback(() => {
    if (!url) return;
    triggerFileDownload(url, {
      onStatusChange: (s) => setStatus(s),
      fallbackNavigate: true,
    });
  }, [url]);

  return {
    status,
    downloading: status === "starting",
    startDownload,
    reset: () => setStatus("idle"),
  };
}
