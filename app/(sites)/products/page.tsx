import { fetchData } from "@/api/api";
import ProductBanner from "@/components/products/ProductBanner";
import AllProductSection from "@/components/products/AllProductSection";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => fetchData("product/all-products"),
  });

  console.log(queryClient)

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
