"use client";

import { useEffect, useRef, useState } from "react";

type DiscountCodeProps = {
  code: string;
  discount: string;
};

export default function DiscountCode({ code, discount }: DiscountCodeProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Skopiuj kod rabatowy ${code}`}
      aria-label={`Kod rabatowy na ${discount}: ${code}. Kliknij, aby skopiować`}
      className="group mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-brand/60 bg-brand/[0.08] px-3.5 py-2 text-xs font-medium text-neutral-200 transition-all duration-200 hover:border-brand hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:gap-2.5 sm:px-4 sm:text-sm"
    >
      <span className="rounded bg-brand px-1.5 py-0.5 text-[11px] font-extrabold leading-none tracking-wide text-white sm:text-xs">
        {discount}
      </span>
      <span className="text-neutral-300">Kod rabatowy:</span>
      <span className="font-extrabold tracking-[0.12em] text-white">
        {code}
      </span>
      <span
        aria-live="polite"
        className="ml-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400 transition-colors group-hover:text-white sm:text-xs"
      >
        {copied ? (
          <>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 text-brand"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white">Skopiowano</span>
          </>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5"
          >
            <rect
              x="5.5"
              y="5.5"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M10.5 5.5V4C10.5 3.17157 9.82843 2.5 9 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V9C2.5 9.82843 3.17157 10.5 4 10.5H5.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
