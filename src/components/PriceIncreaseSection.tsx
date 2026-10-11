"use client";

import React, { useEffect, useState } from "react";

interface ChangeData {
  dir: string;
  pct: number;
}

interface Product {
  id: number | string;
  nameBn: string;
  unit: string;
  today: number;
  image: string;
  change?: ChangeData;
  pct?: number;
}

// fallback data
const fallbackProducts: Product[] = [
  {
    id: 1,
    nameBn: "পেঁয়াজ",
    unit: "প্রতি কেজি",
    today: 48,
    image: "🧅",
    pct: 12.5,
  },
  {
    id: 2,
    nameBn: "আদা",
    unit: "প্রতি কেজি",
    today: 85,
    image: "🫚",
    pct: 9.0,
  },
  {
    id: 3,
    nameBn: "বেগুন",
    unit: "প্রতি কেজি",
    today: 88,
    image: "🍆",
    pct: 4.8,
  },
  {
    id: 4,
    nameBn: "রুই মাছ",
    unit: "প্রতি কেজি",
    today: 46,
    image: "🐟",
    pct: 4.0,
  },
  {
    id: 5,
    nameBn: "ডিম",
    unit: "প্রতি ডজন",
    today: 148,
    image: "🥚",
    pct: 3.9,
  },
  {
    id: 6,
    nameBn: "মাখন (১০০ গ্রাম)",
    unit: "প্রতি পিস",
    today: 185,
    image: "🧈",
    pct: 3.6,
  },
];

export default function PriceIncreaseSection() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor")
      .then((res) => res.json())
      .then((data) => {
        const productsObj =
          data.datasets?.products || data.products || data.data;

        if (productsObj) {
          let rawArray: any[] = [];
          if (Array.isArray(productsObj)) {
            rawArray = productsObj;
          } else if (typeof productsObj === "object") {
            rawArray = Object.values(productsObj).flat();
          }

          const filtered = rawArray
            .filter(
              (item: Product) =>
                item && item.change && item.change.dir === "up"
            )
            .map((item: Product, index: number) => ({
              id: item.id || index,
              nameBn: item.nameBn || "পণ্য",
              unit:
                item.unit === "kg"
                  ? "প্রতি কেজি"
                  : item.unit === "litre"
                  ? "প্রতি লিটার"
                  : "প্রতি একক",
              today: item.today || 0,
              image: item.image || "🛒",
              pct: item.change?.pct || 0,
            }));

          if (filtered.length > 0) {
            setProducts(filtered);
          }
        }
      })
      .catch((err) => {
        console.error("API fetch error, using fallback:", err);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-red-600 font-bold text-lg">▲</span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.slice(0, 6).map((item) => (
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

              <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                <span>▲</span>
                <span>{item.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}