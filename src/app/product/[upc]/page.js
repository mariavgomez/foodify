"use client";
import { Header } from "@/components/Header";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import NutriScoreModal from "@/components/NutriScoreModal";
import Nova from "@/components/Nova";
import SlideOver from "@/components/SlideOver";

export default function Product() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaOpen, setNovaOpen] = useState(false);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`/api/product/${params.upc}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data", error);

        //Placeholders if the api fails, show an example.
        setProduct({
          name: "Classic Mayo",
          brand: "Chosen Foods ",
          image: "/avocado_mayo_img.jpeg",
          ingredients:
            "Avocado Oil, Filtered Water, Egg Yolks, Organic Whole Eggs, Organic Distilled White Vinegar, Organic Mustard (Distilled Organic Vinegar, Water, Organic Mustard Seed, Salt, Organic Spices), Salt, Organic Rosemary Extract",
          nova_group: 3,
          nutriscore_grade: "e",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [params.upc]);

  const getNovaImage = (novaGroup) => {
    switch (novaGroup) {
      case 1:
        return "/nova_1.png";
      case 2:
        return "/nova_2.png";
      case 3:
        return "/nova_3.png";
      case 4:
        return "/nova_4.png";
      default:
        return "/nova_unknown.svg";
    }
  };

  const getNutriscore = (nutriScore) => {
    switch (nutriScore) {
      case "a":
        return "/nutri_score-A.png";
      case "b":
        return "/nutri_score-B.png";
      case "c":
        return "/nutri_score-C.png";
      case "d":
        return "/nutri_score-D.png";
      case "e":
        return "/nutri_score-E.png";
      default:
        return "/nutriscore-unknown.svg";
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className=" overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 p-8 md:flex md:justify-center  md: items-start md:gap-8  xl:gap-40">
          <div className="md:max-w-xs">
            <div className=" flex justify-center items-center mb-4 md:max-w-xs">
              <img
                className="w-48 max-h-72 object-contain flex-none rounded-xl bg-white object-contain ring-1 ring-gray-900/10 shadow-md shadow-stone-500/50"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">
                {product.name ?? "No name found"}
              </h2>
              <p className="text-gray-600 mb-4">
                {product.brand ?? "No brand found"}
              </p>
              <div className="flex justify-around ">
                <div className="mt-4 ">
                  <Image
                    src={getNovaImage(product.nova_group)}
                    alt={`Nova Group ${product.nova_group}`}
                    width={40}
                    height={40}
                    className="mx-auto"
                    onClick={() => setNovaOpen(true)}
                  />
                </div>
                {novaOpen && (
                  <Nova
                    novaGroup={product.nova_group}
                    onClose={() => setNovaOpen(false)}
                  />
                )}

                <div className="mt-2">
                  <Image
                    src={getNutriscore(product.nutriscore_grade)}
                    alt={`Nova Group ${product.nutriscore_grade}`}
                    width={150}
                    height={150}
                    className="mx-auto"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>

                {isModalOpen && (
                  <NutriScoreModal
                    nutriScore={product.nutriscore_grade}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="md:max-w-xs ">
            <div>
              <h3 className="text-lg text-justify font-semibold mt-5 mb-1 md:mt-0">
                Ingredients:
              </h3>
              <ul className="list-none text-justify text-gray-700 divide-y divide-gray-100">
                {(product.ingredients ?? "No ingredients found")
                  .split(", ")
                  .map((ingredient, index) => (
                    <li
                      className="flex justify-between gap-x-6 py-1 capitalize"
                      key={index}
                    >
                      {ingredient}
                    </li>
                  ))}
              </ul>
            </div>
            {/* <p className="text-sm text-gray-500 mb-1">
              Labels: {product.labels ?? "no label found"}
            </p> */}
          </div>
        </div>
      )}
    </>
  );
}
