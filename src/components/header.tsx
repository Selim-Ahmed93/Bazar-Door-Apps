import Image from "next/image";
import React from "react";
import Link from "next/link";
import Navlinks from "./Navlinks";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Logo + Title + Auth Buttons */}
        <div className="py-3 flex items-center justify-between gap-6">
          
          {/* Logo + Title */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo */}
            <div className="w-11 h-11 bg-[#0a7c36] rounded-xl flex items-center justify-center shadow-sm">
              <Image
                src="/assets/logo-icon.png"
                alt="বাজার দর"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            {/* Title + Date */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                {currentDate}
              </p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/signin"
              className="
                px-3 py-2
                text-sm font-medium
                text-gray-700
                rounded-lg
                hover:text-[#0a7c36]
                hover:bg-green-50
                transition-colors
                inline-block
              "
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="
                px-4 py-2
                text-sm font-semibold
                text-white
                bg-[#0a7c36]
                rounded-lg
                shadow-sm
                hover:bg-[#086b2f]
                active:scale-95
                transition-all
                inline-block
              "
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Bottom Row: Navlinks (Below logo, date and buttons with horizontal scroll) */}
        <div className="py-2.5 overflow-x-auto whitespace-nowrap border-t border-gray-100">
          <Navlinks />
        </div>

      </div>
    </header>
  );
};

export default Header;