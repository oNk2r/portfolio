import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h1: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h1
      className="mt-10 mb-4 text-2xl sm:text-3xl font-normal font-['Instrument_Serif',Georgia,serif] text-neutral-900 dark:text-neutral-100 tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h2
      className="mt-8 mb-3 text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h3
      className="mt-6 mb-2 text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <p
      className="text-neutral-700 dark:text-neutral-300 mb-5 leading-7 text-[16px]"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ul
      className="mb-5 ml-6 list-disc space-y-2 text-neutral-700 dark:text-neutral-300 leading-7"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ol
      className="mb-5 ml-6 list-decimal space-y-2 text-neutral-700 dark:text-neutral-300 leading-7"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <li className="text-neutral-700 dark:text-neutral-300 leading-7" {...props}>
      {children}
    </li>
  ),
  strong: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <strong
      className="font-semibold text-neutral-900 dark:text-neutral-100"
      {...props}
    >
      {children}
    </strong>
  ),
  a: ({
    children,
    href = "",
    ...props
  }: {
    children: React.ReactNode;
    href?: string;
    [key: string]: unknown;
  }) => (
    <Link
      href={href}
      className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
      {...props}
    >
      {children}
    </Link>
  ),
  blockquote: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <blockquote
      className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1 italic text-neutral-600 dark:text-neutral-400 my-5"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <code
      className="font-mono text-[13px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800"
      {...props}
    >
      {children}
    </code>
  ),
  hr: ({ ...props }: { [key: string]: unknown }) => (
    <hr className="border-0 border-t border-neutral-200 dark:border-neutral-800 my-8" {...props} />
  ),
  img: ({
    src = "",
    alt = "",
    ...props
  }: {
    src?: string;
    alt?: string;
    [key: string]: unknown;
  }) => (
    <span className="block my-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        {...props}
      />
    </span>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
