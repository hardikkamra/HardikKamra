import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhuvan Soni — Finance & Data Portfolio",
  description: "Finance student, CMA US candidate, and data enthusiast from Jaipur. Expertise in Excel, Power BI, SQL, and SAP.",
  keywords: ["finance", "data analytics", "CMA US", "Power BI", "SQL", "SAP", "Bhuvan Soni"],
  openGraph: {
    title: "Bhuvan Soni — Finance & Data Portfolio",
    description: "Finance student, CMA US candidate, and data enthusiast from Jaipur. Expertise in Excel, Power BI, SQL, and SAP.",
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
