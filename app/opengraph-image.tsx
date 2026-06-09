import { ImageResponse } from "next/og";

export const alt = "AM//PM Emo Night — Australia's biggest touring emo night";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>AM//PM</div>
        <div style={{ marginTop: 28, fontSize: 34, letterSpacing: 6, color: "#fe5859", textTransform: "uppercase" }}>
          Emo Night
        </div>
        <div style={{ marginTop: 40, fontSize: 26, letterSpacing: 2, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
          Australia&apos;s Biggest Touring Emo Night
        </div>
      </div>
    ),
    { ...size }
  );
}
