'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import Image from "next/image";

import { Container } from '@/components/Container'

const examples = [
  {
    image: "/Screenshot_0.png",
  },
  {
    image: "/Screenshot_1.png",
  },
  {
    image: "/Screenshot_2.png",
  },
  {
    image: "/Screenshot_3.png",
  },
  {
    image: "/Screenshot_4.png",
  },
  {
    image: "/Screenshot_5.png",
  },
  {
    image: "/Screenshot_6.png",
  },
  {
    image: "/Screenshot_7.png",
  },
  {
    image: "/Screenshot_8.png",
  },
  {
    image: "/Screenshot_9.png",
  },
  {
    image: "/Screenshot_10.png",
  },
  {
    image: "/Screenshot_11.png",
  },
  {
    image: "/Screenshot_12.png",
  },
  {
    image: "/Screenshot_13.png",
  },
  {
    image: "/Screenshot_14.png",
  },
]

function Example({ image, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <div className="mt-4 rounded-3xl ">
                  <Image
                    src={image}
                    alt={`product`}
                    width={500}
                    height={500}
                    className="mx-auto"
                   
                  />
                </div>
      </blockquote>
    </figure>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ExampleColumn({ examples, className, examplesClassName, msPerPixel = 0 }) {
  let columnRef = useRef(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {examples.concat(examples).map((example, exampleIndex) => (
        <Example
          key={exampleIndex}
          aria-hidden={exampleIndex >= examples.length}
          className={examplesClassName?.(exampleIndex % examples.length)}
          {...example}
        />
      ))}
    </div>
  )
}

function ExampleGrid() {
  let containerRef = useRef(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(examples, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ExampleColumn
            examples={[...column1, ...column3.flat(), ...column2]}
            exampleClassName={(exampleIndex) =>
              clsx(
                exampleIndex >= column1.length + column3[0].length &&
                  'md:hidden',
                  exampleIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ExampleColumn
            examples={[...column2, ...column3[1]]}
            className="hidden md:block"
            exampleClassName={(exampleIndex) =>
              exampleIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ExampleColumn
            examples={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Examples() {
  return (
    <section
      id="examples"
      aria-labelledby="examples-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32 dark:bg-gray-50"
    >
      <Container>
        <h2
          id="examples-title"
          className="text-3xl mb-3 font-medium tracking-tight text-gray-900 sm:text-center "
        >
         Unlock the secrets of your food.
        </h2>
        <h3
          id="examples-title"
          className="text-2xl font-medium tracking-tight text-gray-900 sm:text-center "
        >
          Scan for ingredients, Nova groups, and Nutri-Score.
        </h3>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
        Don&apos;t just eat. Eat mindfully. Scan to thrive.
        </p>
        <ExampleGrid />
      </Container>
    </section>
  )
}
