import ProductBanner from "@/components/products/ProductBanner";
import AllProductSection from "@/components/products/AllProductSection";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { fetchData } from "@/api/api";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => fetchData("product/all-products"),
  });

  const products = queryClient.getQueryData(["products"]);

  return (
    <div>
      <ProductBanner />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProductSection  />
      </HydrationBoundary>
    </div>
  );
};

export default page;
