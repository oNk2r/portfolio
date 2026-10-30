"use client";

import { useState, useEffect } from "react";
import displayPicture from "@/public/profile.jpg";
import { getCalApi } from "@calcom/embed-react";
import siteConfig from "@/config/site";
import LiveStatus from "./LiveStatus";
import TiltAvatar from "./TiltAvatar";

const Profile = () => {
  const [currentTime, setCurrentTime] = useState("");

  const avatarUrl = siteConfig.githubUsername
    ? `https://github.com/${siteConfig.githubUsername}.png`
    : displayPicture;

  useEffect(() => {
    const tick = () => {
      try {
        const timeString = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: siteConfig.timezone || undefined,
        });
        setCurrentTime(`${siteConfig.timezoneLabel || "IST"} ${timeString}`);
      } catch {
        const fallback = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setCurrentTime(`IST ${fallback}`);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const calCom = siteConfig.calCom;
    if (!calCom?.enabled || !calCom?.namespace) return;
    const namespace = calCom.namespace;
    (async function () {
      try {
        const cal = await getCalApi({ namespace });
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      } catch (err) {
        console.warn("Cal.com init notice:", err);
      }
    })();
  }, []);

  return (
    <div className="bg-transparent z-12 mt-7 w-full mx-auto max-w-2xl">
      <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* 3D Tilting Card Avatar */}
          <TiltAvatar avatarUrl={avatarUrl} name={siteConfig.name} />

          <div className="flex flex-col justify-center">
            <p className="text-2xl sm:text-[26px] font-Neue font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
              {siteConfig.name}
            </p>
            <p className="text-[13px] sm:text-[14px] text-neutral-500 dark:text-neutral-400 mt-1 transition-opacity duration-300">
              {siteConfig.bioSnippet}
            </p>
          </div>
        </div>

        {/* Right Badges: Live Status + Local Time Clock */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap pt-1">
          <LiveStatus />
          <span className="font-mono text-[11px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 px-2.5 py-1 rounded-full shrink-0 select-none">
            {currentTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
