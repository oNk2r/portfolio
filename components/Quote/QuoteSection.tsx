import siteConfig from "@/config/site";

const QuoteSection = () => {
  return (
    <div className="w-full max-w-2xl mx-auto font-sans tracking-tight py-4">
      <div className="w-full flex items-center justify-center">
        <div className="w-full">
          <div className="relative bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-xl w-full px-9 pt-8 pb-7 overflow-hidden">
            {/* Faded background quote mark */}
            <span className="absolute leading-1 tracking-[-2rem] z-12 font-extrabold left-0 -top-4 text-[120px] text-neutral-200 dark:text-neutral-800 select-none pointer-events-none">
              ,, 
            </span>

            {/* Quote text */}
            <p className="relative pl-6 sm:pl-8 italic font-bold font-sans text-2xl z-12 text-neutral-800 dark:text-neutral-200 tracking-wide mb-5">
              &ldquo;{siteConfig.quote.text}&rdquo;
            </p>

            {/* Author */}
            <p className="text-right text-[13px] text-neutral-500 z-12 dark:text-neutral-400 tracking-wide not-italic">
              — {siteConfig.quote.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
