import React from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  nameBn?: string;
  name?: string;
  title?: string;
  icon?: string;
  image?: string;
  today?: number | string;
  price?: number | string;
  unit?: string;
  category?: string;
  categoryId?: string | number;
  change?: {
    dir: string;
    pct: number;
  };
}

interface Category {
  id: string | number;
  slug: string;
  nameBn: string;
  icon?: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let products: Product[] = [];
  let categoryName = "ক্যাটাগরি পণ্যসমূহ";

  try {
    // ১. Categories API theke current category er nam khuje ber kora
    const catRes = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    let currentCategory: Category | undefined;

    if (catRes.ok) {
      const categories: Category[] = await catRes.json();
      currentCategory = categories.find((c) => c.slug === slug);
      if (currentCategory) {
        categoryName = currentCategory.nameBn;
      }
    }

    // ২. Products API theke shob product ene category onujayi filter kora
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const response = await res.json();
      const rawProducts = response.data || response.products || response;

      if (Array.isArray(rawProducts)) {
        products = rawProducts.filter((item: Product) => {
          const itemCat = String(item.category || "").toLowerCase();
          const targetSlug = String(slug).toLowerCase();
          const targetName = String(currentCategory?.nameBn || "").toLowerCase();

          return (
            itemCat === targetSlug ||
            itemCat.includes(targetSlug) ||
            itemCat === targetName ||
            item.categoryId === currentCategory?.id
          );
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch category products:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {categoryName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            এই ক্যাটাগরির পণ্যের আজকের বাজার দর এক নজরে
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#0a7c36] bg-green-50 rounded-xl hover:bg-green-100 transition-colors w-fit"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((item, index) => (
            <div
              key={item.id ?? index}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-green-200 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Top Part: Icon, Name & Unit */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 group-hover:bg-green-50 transition-transform duration-300">
                  {item.image ?? item.icon ?? "🛒"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0a7c36] transition-colors duration-200">
                    {item.nameBn ?? item.name ?? "পণ্য"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.unit ? `প্রতি ${item.unit}` : "প্রতি একক"}
                  </p>
                </div>
              </div>

              {/* Bottom Part: Price & Change Percentage */}
              <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">
                    আজকের দাম
                  </span>
                  <span className="text-xl font-extrabold text-gray-900">
                    {item.today ?? item.price ?? "—"}{" "}
                    <span className="text-sm font-medium text-gray-600">
                      টাকা
                    </span>
                  </span>
                </div>

                {item.change && (
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
                      item.change.dir === "up"
                        ? "text-red-600 bg-red-50"
                        : "text-green-600 bg-green-50"
                    }`}
                  >
                    <span>{item.change.dir === "up" ? "▲" : "▼"}</span>
                    <span>{item.change.pct}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}