"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // try-catch ব্যবহার করা হয়েছে যাতে error না মার
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        const list = data.data || data.products || [];
        setCategories(list);
      })
      .catch((err) => {
        console.error("Navlinks fetch error:", err);
        // Fallback default categories if API fails
        setCategories([
          { slug: "all", nameBn: "সব পণ্য" },
          { slug: "rice", nameBn: "চাল" },
          { slug: "vegetable", nameBn: "সবজি" },
          { slug: "fish", nameBn: "মাছ" },
        ]);
      });
  }, []);

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1">
      {categories.map((cat, index) => {
        const isActive = pathname === `/category/${cat.slug || index}`;
        return (
          <Link
            key={index}
            href={`/category/${cat.slug || index}`}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              isActive
                ? "bg-[#0a7c36] text-white font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.nameBn || cat.name || "ক্যাটাগরি"}
          </Link>
        );
      })}
    </div>
  );
}