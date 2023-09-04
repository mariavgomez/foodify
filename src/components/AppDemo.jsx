'use client'

import Image from "next/image";
import { AppScreen } from '@/components/AppScreen'

export function AppDemo() {
  return (
    <AppScreen>
      <AppScreen.Body>
      <div className="mt-[-15px]">
                  <Image
                    src="/Screenshot-product.png"
                    alt="scanning screenshot"
                    width={320}
                    height={320}
                    className="rounded-xl"                   
                  />              
                </div>       
      </AppScreen.Body>
    </AppScreen>
  )
}
