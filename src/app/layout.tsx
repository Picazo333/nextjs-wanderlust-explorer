import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wanderlust Explorer",
    template: "%s · Wanderlust Explorer",
  },
  description:
    "Browse 100 local travel experiences. Search by title and filter by category and destination. The address keeps the active filters.",
  openGraph: {
    title: "Wanderlust Explorer",
    description:
      "Browse 100 local travel experiences. Search by title and filter by category and destination.",
    locale: "en_US",
    type: "website",
  },
};

const motionBoot = `(function(){try{var reduce=false;try{reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){}if(!reduce){try{reduce=localStorage.getItem("signal-motion")==="reduce";}catch(e){}}document.documentElement.setAttribute("data-motion",reduce?"reduced":"full");}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
