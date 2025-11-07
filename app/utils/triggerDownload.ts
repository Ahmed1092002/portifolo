"use client";

export type DownloadStatus = "starting" | "done" | "error";

/**
 * Triggers a file download without opening a new tab/window using a hidden iframe.
 * Falls back to same-tab navigation if iframe download doesn't fire reliably.
 */
export function triggerFileDownload(
  url: string,
  options?: {
    timeoutMs?: number;
    onStatusChange?: (status: DownloadStatus) => void;
    /** If true, navigate current tab to the URL on error as a last resort */
    fallbackNavigate?: boolean;
  }
): void {
  const timeoutMs = options?.timeoutMs ?? 12_000;
  try {
    options?.onStatusChange?.("starting");

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    let finished = false;

    const cleanup = () => {
      try {
        document.body.removeChild(iframe);
      } catch {}
    };

    const timeoutId = window.setTimeout(() => {
      if (finished) return;
      finished = true;
      options?.onStatusChange?.("done");
      cleanup();
    }, timeoutMs);

    const onLoad = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeoutId);
      options?.onStatusChange?.("done");
      cleanup();
    };

    const onError = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeoutId);
      options?.onStatusChange?.("error");
      cleanup();
      if (options?.fallbackNavigate) {
        window.location.href = url;
      }
    };

    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", onError);
    iframe.src = url;
    document.body.appendChild(iframe);
  } catch {
    options?.onStatusChange?.("error");
    if (options?.fallbackNavigate) {
      window.location.href = url;
    }
  }
}
