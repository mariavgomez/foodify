"use client";
import React, { useRef, useEffect, useState } from "react";
import CameraCanvas from "../page";

export default function Scan() {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  // function fetchProductInfo(upc) {
  //   fetch(`/api/product/[upc]`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProductInfo(data);
  //       const productIngredients = data.product.ingredients_text;
  //       setIngredients(productIngredients.split(","));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product data:", error);
  //     });
  // }
  // fetchProductInfo(data.codeResult.code);

  // const toggleScanning = () => {
  //   setScanning((prevScanning) => !prevScanning);
  // };

  return (
    <>
      <div className="relative">
        <CameraCanvas />
        <div className="absolute flex justify-center left-0 right-0 bottom-8 ">
          <button className="rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 backdrop-blur-sm bg-opacity-50 shadow-xl backdrop-brightness-50">
            Stop Scanning
          </button>
        </div>

        {productInfo && (
          <div>
            <h2>Product Information</h2>
            <pre>{JSON.stringify(productInfo, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h2>Product Information</h2>
        <pre>{JSON.stringify(productInfo, null, 2)}</pre>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// useEffect(() => {
//   if (scanning) {
//     Quagga.init(
//       {
//         inputStream: {
//           name: "Live",
//           type: "LiveStream",
//         },
//         locate: false,
//         decoder: {
//           readers: ["ean_reader"],
//         },
//       },
//       (err) => {
//         if (err) {
//           console.error("Error initializing Quagga:", err);
//           return;
//         }
//         Quagga.start();

//         Quagga.onDetected((data) => {
//           console.log("Barcode detected:", data.codeResult.code);

//           function fetchProductInfo(upc) {
//             fetch(`/api/product/[upc]`)
//               .then((response) => {
//                 if (!response.ok) {
//                   throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//               })
//               .then((data) => {
//                 setProductInfo(data);
//                 const productIngredients = data.product.ingredients_text;
//                 setIngredients(productIngredients.split(","));
//               })
//               .catch((error) => {
//                 console.error("Error fetching product data:", error);
//               });
//           }
//           fetchProductInfo(data.codeResult.code);
//         });
//       }
//     );

//     return () => {
//       Quagga.stop();
//     };
//   }
// }, [scanning]);
