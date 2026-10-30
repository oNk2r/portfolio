import Page from "@/lib/assets/page";
import NAVBAR from "@/components/NAVBAR";

export default function Home() {
  return (
    <div className="flex flex-col px-3.5 sm:px-4 flex-1 relative items-center justify-center font-sans w-full max-w-full overflow-x-hidden">
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
