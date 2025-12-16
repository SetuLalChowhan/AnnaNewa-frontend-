import { fetchData } from "@/api/api";
import ProductBanner from "@/components/products/ProductBanner";
import AllProductSection from "@/components/products/AllProductSection";


const page = async () => {
  const products = await fetchData("product/all-products");

  return (
    <div>
      <ProductBanner   />
      <AllProductSection products={products}  sdad/>
    </div>
  );
};

export default page;
