import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const upc = params.upc;
  console.log(upc);
  const apiUrl = `https://world.openfoodfacts.org/api/2/product/${upc}.json`;

  try {
    const response = await fetch(apiUrl);

    const data = await response.json();

    // console.log(data);

    const product = {
      name: data.product.product_name,
      brand: data.product.brands,
      image: data.product.image_url,
      ingredients: data.product.ingredients_text,
      labels: data.product.labels,
      additives_n: data.product.additives_n,
      additives_tags: data.product.additives_tags,
      ingredients_analysis: data.product.ingredients_analysis,
      nova_group: data.product.nova_group,
      nutriscore_grade: data.product.nutriscore_grade,
    };

    // const product = await response.json();
    console.log("got product", product);

    return NextResponse.json(product);
  } catch (error) {
    console.log("got error calling API", error);
  }
}
