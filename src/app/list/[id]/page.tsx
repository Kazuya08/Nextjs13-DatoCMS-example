import { use } from 'react';

async function getProduct(id: any) {
  const res = await fetch(`http://localhost:3001/products/${id}`); // request type no-store 
  return res.json();
}

export default function Page({ params }: any) {
  const { id } = params;
  const product = use(getProduct(id));
  return (
    <div>
      <hr></hr>
      <h1>{product?.title}</h1>
      <div>{product?.description}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3001/products', { cache: 'force-cache' });
    const products = await res.json();
    
  return products?.map((product: any) => ({
    id: product.id,
  }));
}
