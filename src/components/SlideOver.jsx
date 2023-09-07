"use client";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams } from "next/navigation";
import { Button } from "@/components/Button";


export default function SlideOver( { openSlide, setOpenSlide, barcode}) {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    setLoading(true)
  }, [barcode])

  useEffect(() => {
    async function productData() {
      try {
        const response = await fetch(`/api/product/${barcode}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data", error);
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
    if (barcode) {
        productData()
    }  
  }, [barcode]);

return (
<Transition.Root show={openSlide}  as={Fragment}>
{loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
      <Dialog as="div" className="relative z-40 bg-white" onClose={() => {setOpenSlide(false)}}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-x-0 bottom-0 flex max-w-full  justify-center  ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-white rounded-xl ">
                  <div className="flex h-full flex-col overflow-y-scroll py-10 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between ">
                        <div className=" flex justify-center items-center mb-4 md:max-w-xs">
                          <img
                            className="w-48 max-h-72 object-contain flex-none rounded-xl bg-white object-contain ring-1 ring-gray-900/10 shadow-md shadow-stone-500/50"
                            src={product.image ?? "/avocado_mayo_img.jpeg"}
                            alt={product.name}
                          />
                        </div>
                        <h2 className="text-2xl font-bold ml-5 mb-1 text-gray-600 dark:text-gray-600 ">
                          {product.name ?? "No name found"}
                        </h2>
                       
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpenSlide(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>                      
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                     <Button
                    href={`/product/${barcode}`}
                    className=" shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 backdrop-blur-sm bg-opacity-50 shadow-xl backdrop-brightness-50"
                    >
                    Open
                  </Button>
                  </div>                
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>)}
    </Transition.Root>
  )
}
