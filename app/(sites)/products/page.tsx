import ProductBanner from "@/components/products/ProductBanner";
import AllProductSection from "@/components/products/AllProductSection";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const getAllProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/all-products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  
const products = queryClient.getQueryData(["products"]);

console.log(products);

  return (
    <div>
      <ProductBanner />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProductSection />
      </HydrationBoundary>
    </div>
  );
};

export default page;
