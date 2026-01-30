"use client";

import { useRouter } from "next/navigation";
import { FileUploadZone } from "./file-upload-zone";

/**
 * Landing page upload zone: selecting a file sends user to dashboard to complete upload and analysis.
 */
export function LandingUpload() {
  const router = useRouter();

  return (
    <FileUploadZone
      onFileSelect={() => {
        router.push("/dashboard");
      }}
    />
  );
}
