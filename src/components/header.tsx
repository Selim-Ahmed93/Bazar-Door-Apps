import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="min-h-[72px] flex items-center justify-between gap-6">
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

          <nav className="hidden md:flex items-center">
            <Navlinks />
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="
                px-3 py-2
                text-sm font-medium
                text-gray-700
                rounded-lg
                hover:text-[#0a7c36]
                hover:bg-green-50
                transition-colors
              "
            >
              সাইন ইন
            </button>

            <button
              type="button"
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
              "
            >
              সাইন আপ
            </button>
          </div>
        </div>

        {/* Mobile-এর জন্য নিচের লাইনে নেভলিংকস (ছোট স্ক্রিনে স্ক্রোল করা যাবে) */}
        <div className="block md:hidden pb-3 pt-1 overflow-x-auto whitespace-nowrap">
          <Navlinks />
        </div>
      </div>
    </header>
  );
};

export default Header;