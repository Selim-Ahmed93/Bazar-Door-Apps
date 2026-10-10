interface Product {
  id: string | number;
  nameBn?: string;
  name?: string;
  title?: string;
  icon?: string;
  price?: number | string;
  currentPrice?: number | string;
  pricePerUnit?: number | string;
}

interface ProductResponse {
  data?: Product[];
  products?: Product[];
}

function getProductName(product: Product): string {
  return product.nameBn ?? product.name ?? product.title ?? "পণ্য";
}

function getProductPrice(product: Product): number | string {
  return (
    product.price ??
    product.currentPrice ??
    product.pricePerUnit ??
    "—"
  );
}

export default async function Marquee() {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.error("Product API Error:", res.status, res.statusText);
      return null;
    }

    const response: unknown = await res.json();

    if (Array.isArray(response)) {
      products = response as Product[];
    } else if (typeof response === "object" && response !== null) {
      const apiResponse = response as ProductResponse;

      if (Array.isArray(apiResponse.data)) {
        products = apiResponse.data;
      } else if (Array.isArray(apiResponse.products)) {
        products = apiResponse.products;
      }
    }
  } catch (error) {
    console.error("Product Fetch Failed:", error);
    return null;
  }

  if (products.length === 0) {
    console.error("No products found in API response.");
    return null;
  }

  return (
    <section className="w-full overflow-hidden border-y border-green-100 bg-green-50/70 py-3 sm:py-4">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 sm:gap-4 sm:px-6 lg:px-8">
        {/* Marquee Label */}
        <div className="z-10 flex shrink-0 items-center gap-2 rounded-lg bg-[#0a7c36] px-2.5 py-2 text-white shadow-sm sm:px-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-200 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>

          <span className="whitespace-nowrap text-xs font-bold sm:text-sm">
            বাজার আপডেট
          </span>
        </div>

        {/* Marquee Content */}
        <div className="group relative min-w-0 flex-1 overflow-hidden">
          {/* Left Gradient */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-green-50 to-transparent sm:w-8" />

          {/* Right Gradient */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-green-50 to-transparent sm:w-8" />

          {/* Scrolling Track */}
          <div className="marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {products.map((product, index) => (
                  <div
                    key={`${copy}-${product.id}-${index}`}
                    className="flex shrink-0 items-center gap-2 px-3 sm:gap-3 sm:px-5"
                  >
                    {/* Product Name */}
                    <span className="whitespace-nowrap text-xs font-medium text-gray-700 sm:text-sm">
                      <span className="mr-1.5" aria-hidden="true">
                        {product.icon ?? "🛒"}
                      </span>

                      {getProductName(product)}
                    </span>

                    {/* Product Price */}
                    <span className="whitespace-nowrap text-xs font-bold text-[#0a7c36] sm:text-sm">
                      ৳{getProductPrice(product)}
                    </span>

                    {/* Separator */}
                    <span
                      className="ml-1 text-xs text-green-300 sm:ml-2"
                      aria-hidden="true"
                    >
                      ◆
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}