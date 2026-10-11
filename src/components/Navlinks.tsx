"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<any[]>([]);

  // Category name ebong tar Emoji mapping
  const categoryEmojis: { [key: string]: string } = {
    চাল: "🍚",
    ডাল: "🫘",
    তেল: "🛢️",
    সবজি: "🥬",
    মাছ: "🐟",
    মাংস: "🍗",
    "ডিম-দুধ": "🥛",
    ডিম: "🥛",
    দুধ: "🥛",
    মসলা: "🌶️",
  };

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => {
        const categoryList = data.data || data.categories || data || [];
        setCategories(categoryList);
      })
      .catch((err) => {
        console.error("Categories fetch error:", err);
      });
  }, []);

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1">
      {categories.map((item: any, index: number) => {
        const rawName =
          typeof item === "string"
            ? item
            : item.categoryName || item.nameBn || item.category || item.name || item.slug;

        const linkSlug =
          typeof item === "string"
            ? item
            : item.category || item.slug || rawName;

        const emoji = categoryEmojis[rawName] || "🛒";
        const isActive =
          decodeURIComponent(pathname) === `/category/${linkSlug}`;

        return (
          <Link
            key={index}
            href={`/category/${linkSlug}`}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              isActive
                ? "bg-[#0a7c36] text-white font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{emoji}</span>
            <span>{rawName}</span>
          </Link>
        );
      })}
    </div>
  );
}