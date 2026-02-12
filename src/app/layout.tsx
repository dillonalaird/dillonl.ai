import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "highlight.js/styles/atom-one-dark.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Dillon Laird`,
  description: `Dillon Laird's Personal Website`,
  openGraph: {
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.svg" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(
          inter.className,
          "bg-[#f6f1e7] dark:bg-slate-900 dark:text-slate-400",
        )}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
