import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-white dark:bg-[#09090b]">
      <main className="w-full relative min-h-screen flex flex-col justify-between max-w-[85rem] border-x border-neutral-200 dark:border-neutral-800">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24 text-center">
          {/* Big Stylish 404 Number */}
          <div className="relative flex flex-col gap-2 select-none">
            <p className="text-md font-extrabold text-neutral-700 dark:text-neutral-300 tracking-tighter leading-none">
              4<span className="text-orange-500">0</span>4
            </p>
            <h2 className="lg:text-3xl text-2xl text-neutral-900 dark:text-neutral-100 font-semibold tracking-tighter">
              Page went out for snacks.
              <br />
              I am not mad. We just <br /> hope it brings back chips.{" "}
            </h2>

            <Link
              href="/"
              className="p-2 w-fit mx-auto mt-4 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
