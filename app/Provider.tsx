import { ThemeProvider } from "../components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import LenisProvider from "../components/lenis-provider";
import Page from "@/lib/assets/page";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LenisProvider>
        {children}
        <Page.GradualBlur
          target="page"
          position="bottom"
          height="3rem"
          strength={2.5}
          divCount={2}
          curve="bezier"
          exponential
          opacity={0.5}
          className="z-99"
        />
      </LenisProvider>
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  );
};

export default Provider;
