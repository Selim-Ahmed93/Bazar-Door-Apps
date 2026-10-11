"use client";

import React, { useState } from "react";

interface Product {
  id: number | string;
  nameBn: string;
  unit: string;
  today: number | string;
  image: string;
  type: "up" | "down" | "neutral";
  pct: string;
}

// Screenshot theke shob product er fallback data gulo add kora holo
const allProductsData: Product[] = [
  { id: 1, nameBn: "স্বর্ণমাছি চাল", unit: "প্রতি কেজি", today: 148, image: "🍚", type: "up", pct: "২.৫%" },
  { id: 2, nameBn: "মিনিকেট চাল", unit: "প্রতি কেজি", today: 99, image: "🍚", type: "down", pct: "২.৯%" },
  { id: 3, nameBn: "নাজির চাল", unit: "প্রতি কেজি", today: 94, image: "🍚", type: "neutral", pct: "০.০%" },
  { id: 4, nameBn: "বাটাম সাইজ চাল", unit: "প্রতি কেজি", today: 66, image: "🍚", type: "up", pct: "৩.১%" },
  { id: 5, nameBn: "মসুর ডাল", unit: "প্রতি কেজি", today: 142, image: "🫘", type: "up", pct: "২.৯%" },
  { id: 6, nameBn: "মুগ ডাল", unit: "প্রতি কেজি", today: 135, image: "🫘", type: "neutral", pct: "০.০%" },
  { id: 7, nameBn: "ছোলা", unit: "প্রতি কেজি", today: 120, image: "🫘", type: "down", pct: "২.৪%" },
  { id: 8, nameBn: "আমন ডাল (খোসাসিলা)", unit: "প্রতি কেজি", today: 156, image: "🫘", type: "up", pct: "২.৬%" },
  { id: 9, nameBn: "সরিষার তেল", unit: "প্রতি লিটার", today: 192, image: "🫙", type: "up", pct: "২.১%" },
  { id: 10, nameBn: "পাম তেল", unit: "প্রতি কেজি", today: 168, image: "🥫", type: "down", pct: "২.৩%" },
  { id: 11, nameBn: "ঘানি ভাঙা সরিষার তেল", unit: "প্রতি লিটার", today: 215, image: "🫙", type: "up", pct: "২.৪%" },
  { id: 12, nameBn: "আলু", unit: "প্রতি কেজি", today: 30, image: "🥔", type: "down", pct: "৬.২%" },
  { id: 13, nameBn: "পেঁয়াজ", unit: "প্রতি কেজি", today: 48, image: "🧅", type: "up", pct: "১২.৫%" },
  { id: 14, nameBn: "কাঁচামরিচ", unit: "প্রতি কেজি", today: 92, image: "🌶️", type: "down", pct: "১২.৪%" },
  { id: 15, nameBn: "বেগুন", unit: "প্রতি কেজি", today: 88, image: "🍆", type: "up", pct: "৪.৮%" },
  { id: 16, nameBn: "ঢেঁড়স", unit: "প্রতি কেজি", today: 38, image: "🟢", type: "neutral", pct: "০.০%" },
  { id: 17, nameBn: "রুই মাছ", unit: "প্রতি কেজি", today: 46, image: "🐟", type: "up", pct: "৪.০%" },
  { id: 18, nameBn: "তেলাপিয়া", unit: "প্রতি কেজি", today: 36, image: "🐟", type: "neutral", pct: "০.০%" },
  { id: 19, nameBn: "ইলিশ মাছ", unit: "প্রতি কেজি", today: "১,৮৫০", image: "🐟", type: "up", pct: "৩.৪%" },
  { id: 20, nameBn: "কাতলা মাছ", unit: "প্রতি কেজি", today: 43, image: "🐟", type: "down", pct: "৪.৪%" },
  { id: 21, nameBn: "চিংড়ি মাছ (খোলা)", unit: "প্রতি কেজি", today: 330, image: "🦐", type: "up", pct: "৩.১%" },
  { id: 22, nameBn: "মুরগির মাংস", unit: "প্রতি কেজি", today: 225, image: "🍗", type: "down", pct: "১.২%" },
  { id: 23, nameBn: "গরুর মাংস", unit: "প্রতি কেজি", today: 790, image: "🥩", type: "down", pct: "১.২%" },
  { id: 24, nameBn: "খাসির মাংস", unit: "প্রতি কেজি", today: "১,২৫০", image: "🥩", type: "down", pct: "১.৩%" },
];

export default function AllProductsSection() {
  const [products] = useState<Product[]>(allProductsData);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Title & Subtitle */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          সব পণ্য
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          মোট ৩৩টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-green-200 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            {/* Top Part: Emoji, Name & Unit */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 group-hover:bg-green-50 transition-transform duration-300">
                {item.image}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0a7c36] transition-colors duration-200">
                  {item.nameBn}
                </h3>
                <p className="text-xs text-gray-500">{item.unit}</p>
              </div>
            </div>

            {/* Bottom Part: Current Price & Percentage Change Badge */}
            <div className="flex items-end justify-between pt-3 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-400 block mb-0.5">
                  আজকের দাম
                </span>
                <span className="text-xl font-extrabold text-gray-900">
                  {item.today}{" "}
                  <span className="text-sm font-medium text-gray-600">
                    টাকা
                  </span>
                </span>
              </div>

              {/* Dynamic Badge based on Up, Down or Neutral */}
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
                  item.type === "up"
                    ? "bg-red-50 text-red-600"
                    : item.type === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span>
                  {item.type === "up" ? "▲" : item.type === "down" ? "▼" : "—"}
                </span>
                <span>{item.pct}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}