import Title from '@/features/home/components/title/Title';
import Products from '@/features/home/components/products/Products';
import { Product, ApiProduct } from '@/shared/types/product';

const transformApiProduct = (item: ApiProduct): Product => ({
  ...item,
  inStock: true,
  image: item.image.replace("http://", "https://"), 
});

export default async function Home() {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

  try {
    const response = await fetch(URL, {
      cache: 'no-store',
      headers: {
        "User-Agent": "Mozilla/5.0", 
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      return (
        <>
          <Title />
          <p style={{ color: "red", padding: "20px" }}>
            Failed to load products (Error {response.status}). Please try again.
          </p>
        </>
      );
    }

    const data: ApiProduct[] = await response.json();
    const initialProducts = data.map(transformApiProduct);

    return (
      <>
        <Title />
        <Products initialProducts={initialProducts} />
      </>
    );

  } catch (error) {
    console.error("Fetch failed:", error);

    return (
      <>
        <Title />
        <p style={{ color: "red", padding: "20px" }}>
          Unable to fetch products right now. Please try later.
        </p>
      </>
    );
  }
}
