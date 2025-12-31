import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const profile = getProfile();
  return {
    title: `${profile.name} - ${profile.title}`,
    description: profile.bio,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
