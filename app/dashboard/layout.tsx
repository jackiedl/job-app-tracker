"use client"

import Backdrop from "@/ui/layout/backdrop";
import Header from "@/ui/layout/header";
import Sidenav from "@/ui/layout/sidenav";
import { useSidenav } from "@/context/sidenavContext";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidenav();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <Sidenav />
      <Backdrop />
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        {/* Header */}
        <Header />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  )
}