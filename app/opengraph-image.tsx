import { ImageResponse } from "next/og";

export const alt = "CPVC Guide";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, rgba(217, 140, 82, 0.22), transparent 28%), linear-gradient(180deg, #f8f3ea 0%, #f5efe6 100%)",
          color: "#1f1f1a",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 28,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#a44e22",
          }}
        >
          <div
            style={{
              height: 58,
              width: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "#a44e22",
              color: "#fff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            C
          </div>
          CPVC Guide
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 920 }}>
          <div style={{ fontSize: 84, lineHeight: 0.95, fontWeight: 700 }}>Technical CPVC answers built for search and answer engines.</div>
          <div style={{ fontSize: 34, lineHeight: 1.35, color: "#5c584f", fontFamily: "Arial, sans-serif" }}>
            Practical guidance on CPVC plumbing systems, limits, standards, installation, and troubleshooting.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: 24,
            color: "#5c584f",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span>Quick answers</span>
          <span>Technical guides</span>
          <span>Comparisons</span>
          <span>Standards</span>
        </div>
      </div>
    ),
    size,
  );
}
