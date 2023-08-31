"use client";
import { Header } from "@/components/Header";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import NutriScoreModal from "@/components/NutriScoreModal";
import Nova from "@/components/Nova";
import SlideOver from "@/components/SlideOver";

export default function Product() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

        setProduct({
          name: "Placeholder Product",
          brand: "Placeholder Brand",
          image: "placeholder-image-url",
          ingredients: "Placeholder Ingredients",
          labels: "labels",
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
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
          <div className=" flex justify-center items-center mb-4">
            <img
              className="w-48 h-49 object-contain flex-none rounded-xl bg-white object-cover ring-1 ring-gray-900/10"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.brand}</p>
            <div className="flex justify-around ">
              <div className="mt-4">
                <Image
                  src={getNovaImage(product.nova_group)}
                  alt={`Nova Group ${product.nova_group}`}
                  width={50}
                  height={50}
                  className="mx-auto"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              {isModalOpen && <Nova onClose={() => setIsModalOpen(false)} />}
              <div className="mt-10 ">
                <Image
                  src={getNutriscore(product.nutriscore_grade)}
                  alt={`Nova Group ${product.nutriscore_grade}`}
                  width={70}
                  height={60}
                  className="mx-auto"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              {isModalOpen && (
                <NutriScoreModal onClose={() => setIsModalOpen(false)} />
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-lg text-justify font-semibold mt-5 mb-1">
                Ingredients:
              </h3>
              <ul className="list-none text-justify text-gray-700">
                {(product.ingredients ?? "No ingredients found")
                  .split(", ")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              Labels: {product.labels ?? "no label found"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <>
          <ul
            role="list"
            // className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <img
                src={product.image}
                alt={product.name}
                className="h-15 w-14 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              <div className="text-sm font-medium leading-6 text-gray-900">
                {product.name}
              </div>
              <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500"></Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          View<span className="sr-only">, {product.brand}</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Edit<span className="sr-only">, {product.brand}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">ingredients</dt>
              </div>

              <div className=" gap-x-4 py-3">
                {(product.ingredients ?? "No ingredients found")
                  .split(", ")
                  .map((ingredient, index) => (
                    <li className="text-gray-500   gap-x-2 py-3" key={index}>
                      {ingredient}
                    </li>
                  ))}
              </div>
            </dl>

            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">additives</dt>
                <div className="text-gray-500"> {product.additives_tags}</div>
                <dd className="flex items-start gap-x-2">
                  <div className="text-gray-500 font-medium ">
                    {product.additives_n}
                  </div>
                </dd>
              </div>
            </dl>
            <dl className=" -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6  text-gray-500">
              {" "}
              Labels: {product.labels}
            </dl>
          </ul>
        </>
      )} */
}
