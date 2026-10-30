import Page from "@/lib/assets/page";
import NAVBAR from "@/components/NAVBAR";

export default function Home() {
  return (
    <div className="flex flex-col px-3 flex-1 relative items-center justify-center font-sans">
      <NAVBAR />
      <Page.Profile />
      <Page.About />
      <Page.GithubContribution />
      <Page.Projects />
      {/* <Page.Experience /> (Hidden for now) */}
      <Page.Stack />
      <Page.Education />
      <Page.QuoteSection />
      <Page.Footer />
    </div>
  );
}
