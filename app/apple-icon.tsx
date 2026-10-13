import { ImageResponse } from "next/og";

/** Symbol für den iPhone-Homescreen, gleiche Gestaltung wie app/icon.svg. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#3d6266" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M10 30c9-7 15 5 23 0s13-9 21-3" fill="none" stroke="#dde8e5" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M10 39c9-7 15 5 23 0s13-9 21-3" fill="none" stroke="#e6dfd2" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
