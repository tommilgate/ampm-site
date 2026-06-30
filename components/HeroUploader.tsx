"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { saveHeroUrl } from "@/app/admin/actions";

// Reads an image file's intrinsic dimensions in the browser.
function readDimensions(file: File): Promise<{ width: number | null; height: number | null }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || null, height: img.naturalHeight || null });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: null, height: null });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export default function HeroUploader({ hasHero }: { hasHero: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    setProgress(0);
    try {
      const { width, height } = await readDimensions(file);
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      // Direct browser → Vercel Blob upload (no server-action size limit).
      const blob = await upload(`events-hero-${Date.now()}.${ext}`, file, {
        access: "public",
        handleUploadUrl: "/api/hero-upload",
        onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
      });
      await saveHeroUrl(blob.url, width, height);
      router.refresh();
    } catch (err) {
      setError((err as Error)?.message || "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <label
        id="admin-hero-upload-label"
        style={{
          padding: "10px 20px", borderRadius: 8, background: "#fe5859", color: "#fff",
          fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontSize: 12,
          cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1, display: "inline-block",
        }}
      >
        {busy ? `Uploading ${progress}%` : hasHero ? "Replace" : "Upload"}
        <input
          id="admin-hero-file"
          type="file"
          accept="image/*"
          onChange={onChange}
          disabled={busy}
          style={{ display: "none" }}
        />
      </label>
      {error && <span style={{ color: "#fe5859", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
