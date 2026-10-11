"use client";

import React, { useState } from "react";

interface Product {
  id: number | string;
  nameBn: string;
  unit: string;
  today: number | string;
  image: string;
  pct: number;
}

// Fallback data for products with price decrease

const decreaseProducts: Product[] = [
  {
    id: 1,
    nameBn: "কাঁচামরিচ",
    unit: "প্রতি কেজি",
    today: 92,
    image: "🌶️",
    pct: 12.5,
  },
  {
    id: 2,
    nameBn: "রসুন",
    unit: "প্রতি কেজি",
    today: 125,
    image: "🧄",
    pct: 7.4,
  },
  {
    id: 3,
    nameBn: "আলু",
    unit: "প্রতি কেজি",
    today: 30,
    image: "🥔",
    pct: 6.2,
  },
  {
    id: 4,
    nameBn: "কাতলা মাছ",
    unit: "প্রতি কেজি",
    today: 43,
    image: "🐟",
    pct: 4.4,
  },
  {
    id: 5,
    nameBn: "হাঁসের মাংস",
    unit: "প্রতি কেজি",
    today: 285,
    image: "🦆",
    pct: 3.4,
  },
  {
    id: 6,
    nameBn: "খাসির মাংস",
    unit: "প্রতি কেজি",
    today: "১,২৫০",
    image: "🥩",
    pct: 3.0,
  },
];

export default function PriceDecreaseSection() {
  const [products] = useState<Product[]>(decreaseProducts);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 font-bold text-lg">▼</span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          আজ দাম কমেছে
        </h2>
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
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                  {item.nameBn}
                </h3>
                <p className="text-xs text-gray-500">{item.unit}</p>
              </div>
            </div>

            {/* Bottom Part: Current Price & Percentage */}
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

              {/* Decrease Percentage Badge (Green Theme) */}
              <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                <span>▼</span>
                <span>{item.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}