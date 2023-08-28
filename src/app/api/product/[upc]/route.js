import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const upc = params.upc;
  console.log(upc);
  const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${upc}.json`;

  try {
    const response = await fetch(apiUrl);
    const product = await response.json();
    console.log("got product", product);
    return NextResponse.json(product);
  } catch (error) {
    console.log("got error calling API", error);
  }
}
