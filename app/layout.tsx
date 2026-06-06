import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riddhi-tg — Web3 & AI Portfolio",
  description: "Software Engineer, Machine Learning candidate, and GenAI enthusiast from San Francisco. Expertise in React, Next.js, Solidity, and Web3.",
  keywords: ["web3", "machine learning", "GenAI", "React", "Next.js", "Solidity", "Riddhi-tg"],
  openGraph: {
    title: "Riddhi-tg — Web3 & AI Portfolio",
    description: "Software Engineer, Machine Learning candidate, and GenAI enthusiast from San Francisco. Expertise in React, Next.js, Solidity, and Web3.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
