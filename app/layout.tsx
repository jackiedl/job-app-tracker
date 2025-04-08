import type { Metadata } from "next";

import '@/app/globals.css';
import { SidenavProvider } from "@/context/sidenavContext";
import { ThemeProvider } from "@/context/themeContext";

export const metadata: Metadata = {
  title: "Trackr",
  description: "Easy to use Full Stack Job Application Tracker created by Jackie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <link rel="icon" href="/logo_icon.svg" sizes="any"/>
      <body
        className={`antialiased dark:bg-gray-900`}
      >
        <ThemeProvider>
          <SidenavProvider>
            {children}
          </SidenavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
