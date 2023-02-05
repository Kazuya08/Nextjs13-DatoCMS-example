'use client';

import Link from 'next/link';
import { use } from 'react';

import { getAllTechnologys } from "src/services/datoCMS";

async function getData() {
  const res = await fetch('http://localhost:3001/products', {  next: { revalidate: 10 }, });
  return res.json();
}

export default function ListLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
    }) {
    const products = use(getData()) 
    console.log(products, "products")
    
  const technologys = use(getAllTechnologys()); 

  console.log(technologys)
  return (
      <div>
          <ul>
        {products?.map((product: any) => (
                <li>
                   <Link key={product.id} href={`/list/${product.id}`}>{product.title}</Link>
                </li>
               ))}
      </ul>
      
      <div style={{
        marginTop: "100px"
      }}>
          
             <div style={{
               display: "flex",
               flexDirection: "column"
             }}>
                {technologys?.map((technology: any) => (
                    <div style={{
                      display: "flex",
                    flexDirection: "column",
                      margin: "10px"
                    }}>
                    <p>name: {technology?.name}</p>
                    <img src={technology?.logo?.url} alt="logo"  width="120px"/>
                    </div>
                ))}
               </div>
          </div>

          <div>{children}</div>
    </div>
  );
}