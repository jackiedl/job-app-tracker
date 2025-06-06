"use client"

import GridShape from "@/ui/components/gridshape";
import { ThemeToggleButton } from "@/ui/components/themeButton";
import LoginNav from "@/ui/home/loginNav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          <LoginNav />
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center max-w-xs">
                <Image
                  width={231}
                  height={48}
                  src="./logo.svg"
                  alt="Logo"
                  className="block mb-4"
                />
                <p className="text-center text-gray-400 dark:text-white/60">
                  Full Stack Job Application Tracker
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeToggleButton />
          </div>
        </div>
    </div>
  )
}
