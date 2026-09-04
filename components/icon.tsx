import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ccff00", 
          fontFamily: "monospace",
          fontWeight: 900,
          border: "2px solid #f0f0f0",
          position: "relative",
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            bottom: "4px",
            right: "4px",
            width: "6px",
            height: "6px",
            background: "#ff0099", 
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}