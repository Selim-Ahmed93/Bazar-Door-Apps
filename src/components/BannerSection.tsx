import Image from "next/image";

export default function BannerSection() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
      {/* Left Side: Text Content */}
      <div className="flex-1 space-y-4">
        {/* Date Badge */}
        <div className="inline-block bg-emerald-100/70 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full">
          মঙ্গলবার, ৬ অক্টোবর, ২০২৬
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <button className="bg-[#15803d] hover:bg-[#166534] text-white font-medium px-6 py-2.5 rounded-lg shadow transition duration-200">
            সব পণ্যের দাম দেখুন
          </button>
        </div>
      </div>

      {/* Right Side: Illustration / Image */}
      <div className="relative w-48 h-40 md:w-64 md:h-52 flex-shrink-0">
        <Image
          src="/assets/bazar-hero.png"
          alt="Market Basket Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
