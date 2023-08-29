"use client";
import { useParams } from "next/navigation";
export default function Product() {
  const params = useParams();
  console.log(params);
  return <div>{params.upc}</div>;
}
