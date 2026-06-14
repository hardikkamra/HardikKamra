import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hardik Kamra — Account Executive & Finance Professional",
  description: "Account Executive & Finance Professional with 5+ years of experience in GST & TDS compliance, Tally Prime, and Advanced MS Excel. Based in Chandigarh, India.",
  keywords: ["Hardik Kamra", "Account Executive", "Finance Professional", "GST Compliance", "TDS", "Tally Prime", "MS Excel", "Chandigarh"],
  openGraph: {
    title: "Hardik Kamra — Account Executive & Finance Professional",
    description: "Account Executive & Finance Professional with 5+ years of experience in GST & TDS compliance, Tally Prime, and Advanced MS Excel. Based in Chandigarh, India.",
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
