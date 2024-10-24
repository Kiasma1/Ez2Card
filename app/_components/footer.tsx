import Link from "next/link";
import React from "react";

export default function Footer() {
  const pages = [
    {
      title: "李继刚",
      href: "https://web.okjike.com/u/752D3103-1107-43A0-BA49-20EC29D09E36",
    },
  ];

  return (
    <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-10 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-neutral-500  justify-between items-start  md:px-8">
        <div className="flex flex-col items-center justify-center w-full relative">
          <ul className="transition-colors flex sm:flex-row flex-col hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none gap-4">
            Inspired By{" "}
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none">
                <Link
                  className="transition-colors hover:text-text-neutral-800 "
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}