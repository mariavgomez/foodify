"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function Scan() {
  const router = useRouter();
  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef();
  const barcodeDetectorRef = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const localStreamConstraints = {
      video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        facingMode: "environment",
      },
    };
    navigator.mediaDevices
      .getUserMedia(localStreamConstraints)
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      });

    videoRef.current.addEventListener("loadedmetadata", () =>
      setSize({
        initialized: true,
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      })
    );

    const handle = setInterval(() => {
      capture();
    }, 500);

    return () => {
      clearInterval(handle);
      if (!streamRef.current) return;
      streamRef.current.getTracks().forEach((t) => {
        if (t.readyState === "live") {
          t.stop();
        }
      });
    };
  }, [videoRef.current]);

  const capture = () => {
    if (!size.width || !size.height) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, size.width, size.height);
    barcodeDetectorRef.current
      .detect(ctx.getImageData(0, 0, size.width, size.height))
      .then((barcodes) => {
        if (barcodes.length) {
          console.log(barcodes);
          router.push(`/product/${barcodes[0].rawValue}`);
        }
      });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hidden"
        width={size.width}
        height={size.height}
      ></canvas>
      <video
        className="w-screen h-screen"
        ref={videoRef}
        autoPlay
        playsInline
        muted
      ></video>

      <div className="relative">
        <div className="absolute flex justify-center left-0 right-0 bottom-8 ">
          <Link href="/">
            {" "}
            <button className="rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 backdrop-blur-sm bg-opacity-50 shadow-xl backdrop-brightness-50">
              Stop Scanning
            </button>
          </Link>
        </div>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.15/dist/index.js" />
      <Script
        src="https://cdn.jsdelivr.net/npm/@undecaf/barcode-detector-polyfill@0.9.20/dist/index.js"
        onReady={() => {
          try {
            window["BarcodeDetector"].getSupportedFormats();
          } catch {
            window["BarcodeDetector"] =
              barcodeDetectorPolyfill.BarcodeDetectorPolyfill;
          }

          barcodeDetectorRef.current = new BarcodeDetector({
            formats: ["ean_13"],
          });
        }}
      />
    </>
  );
}
