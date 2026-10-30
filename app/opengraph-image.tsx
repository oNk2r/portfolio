import { ImageResponse } from "next/og";
import siteConfig from "@/config/site";

export const runtime = "nodejs";

export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "60px 80px",
          color: "#ededed",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(56, 189, 248, 0.15)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.15)",
            filter: "blur(90px)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            {siteConfig.status.label}
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#71717a",
              fontFamily: "monospace",
            }}
          >
            {siteConfig.handle}
          </div>
        </div>

        {/* Center: Title & Bio */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "66px",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#a1a1aa",
              fontWeight: 500,
            }}
          >
            {siteConfig.role}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#71717a",
              marginTop: "8px",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {siteConfig.headline}
          </div>
        </div>

        {/* Bottom: Tech tags & Site */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {["Next.js", "React", "TypeScript", "Node.js", "Socket.io"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "14px",
                    color: "#d4d4d8",
                    fontFamily: "monospace",
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#52525b",
              fontFamily: "monospace",
            }}
          >
            github.com/oNk2r
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

