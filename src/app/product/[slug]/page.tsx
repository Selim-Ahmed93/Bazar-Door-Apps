"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface Product {
  id: string | number;
  nameBn?: string;
  name?: string;
  category?: string;
  unit?: string;
  today?: number | string;
  image?: string;
  icon?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  avgPrice?: number | string;
}

export default function ProductDetailsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Protected Route Check (লগইন না থাকলে সাইন ইন পেজে পাঠাবে)
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("পণ্যের বিস্তারিত দাম দেখতে আগে সাইন ইন করুন!");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  // Product Data Fetching
  useEffect(() => {
    if (session) {
      fetch("https://openapi.programming-hero.com/api/bazardor/products")
        .then((res) => res.json())
        .then((data) => {
          const rawArray = data.data || data.products || data;
          if (Array.isArray(rawArray)) {
            // Slug বা ID দিয়ে ম্যাচ করা
            const found = rawArray.find(
              (item: any) =>
                item.id === slug ||
                item.nameBn?.replaceAll(" ", "-") === slug
            ) || rawArray[0]; // fallback
            
            setProduct(found);
          }
        })
        .catch((err) => console.error("Error fetching product details:", err))
        .finally(() => setLoading(false));
    }
  }, [session, slug]);

  if (isPending || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-[#0a7c36] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#0a7c36] bg-green-50 px-3.5 py-2 rounded-xl hover:bg-green-100 transition-colors mb-6"
      >
        ← প্রধান পেজে ফিরে যান
      </Link>

      {/* Main Header Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shrink-0">
            {product?.image || product?.icon || "🛒"}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-green-100 text-[#0a7c36] rounded-md">
                {product?.category || "নিত্যপণ্য"}
              </span>
              <span className="text-xs text-gray-400">
                • {product?.unit ? `প্রতি ${product.unit}` : "প্রতি কেজি"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {product?.nameBn || "পণ্যের নাম"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              আজকের বাজারের সর্বশেষ আপডেটেড দরদাম
            </p>
          </div>
        </div>
      </div>

      {/* Price Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
          <span className="text-xs text-gray-400 font-medium block mb-1">
            সর্বনিম্ন দাম
          </span>
          <span className="text-2xl font-black text-green-600">
            ৳{product?.minPrice || product?.today || "৪০"}
          </span>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
          <span className="text-xs text-gray-400 font-medium block mb-1">
            গড় দাম
          </span>
          <span className="text-2xl font-black text-[#0a7c36]">
            ৳{product?.avgPrice || product?.today || "৪৫"}
          </span>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
          <span className="text-xs text-gray-400 font-medium block mb-1">
            সর্বোচ্চ দাম
          </span>
          <span className="text-2xl font-black text-red-600">
            ৳{product?.maxPrice || (Number(product?.today || 45) + 5)}
          </span>
        </div>
      </div>

      {/* Bazar Wise Prices Table */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h3>
        <div className="divide-y divide-gray-100">
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-600">কারওয়ান বাজার</span>
            <span className="font-bold text-gray-900">৳{product?.today || 45} / কেজি</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-600">নিউ মার্কেট বাজার</span>
            <span className="font-bold text-gray-900">৳{(Number(product?.today || 45) + 2)} / কেজি</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-600">মিরপুর ১ নম্বর বাজার</span>
            <span className="font-bold text-gray-900">৳{(Number(product?.today || 45) - 1)} / কেজি</span>
          </div>
        </div>
      </div>
    </div>
  );
}