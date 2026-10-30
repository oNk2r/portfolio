"use client";

import GitHubActivity from "@/components/ui/github-activity";
import siteConfig from "@/config/site";

export default function GithubContribution() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col mx-auto overflow-hidden w-full max-w-2xl relative flex-1 items-center justify-center bg-transparent">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-4 px-2 bg-transparent sm:items-start">
          <GitHubActivity
            showMonths={true}
            year={currentYear}
            username={siteConfig.githubUsername || "oNk2r"}
          />
        </main>
      </div>
    </div>
  );
}
