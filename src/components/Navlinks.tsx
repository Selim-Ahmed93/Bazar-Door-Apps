import React from "react";
import Link from "next/link";

// Category Type
interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    return null;
  }

  // API Response Type
  const categories: Category[] = await res.json();

  return (
    <nav className="flex items-center gap-1">
      {categories.map((category: Category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="
            px-3 py-2
            rounded-lg
            text-sm
            font-medium
            text-gray-600
            transition-colors
            hover:bg-green-50
            hover:text-[#0a7c36]
          "
        >
          <span className="mr-1">{category.icon}</span>
          {category.nameBn}
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;