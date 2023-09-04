// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import CameraCanvas from "../page";

// export default function Scan() {
//   const scannerRef = useRef(null);
//   const [scanning, setScanning] = useState(false);
//   const [productInfo, setProductInfo] = useState(null);
//   const [ingredients, setIngredients] = useState([]);

//   return (
//     <>
//       <div className="relative">
//         <CameraCanvas />
//         <div className="absolute flex justify-center left-0 right-0 bottom-8 ">
//           <button className="rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 backdrop-blur-sm bg-opacity-50 shadow-xl backdrop-brightness-50">
//             Stop Scanning
//           </button>
//         </div>

//         {productInfo && (
//           <div>
//             <h2>Product Information</h2>
//             <pre>{JSON.stringify(productInfo, null, 2)}</pre>
//           </div>
//         )}
//       </div>

//       <div>
//         <h2>Product Information</h2>
//         <pre>{JSON.stringify(productInfo, null, 2)}</pre>
//         <h3>Ingredients:</h3>
//         <ul>
//           {ingredients.map((ingredient, index) => (
//             <li key={index}>{ingredient.trim()}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }
