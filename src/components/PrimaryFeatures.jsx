'use client'
import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import { AppScreen } from '@/components/AppScreen'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'

import Image from "next/image";
import React from 'react'

const MotionAppScreenBody = motion(AppScreen.Body)

const features = [
  {
    name: 'Scan a barcode',
    icon: ScanIcon,
    screen: ScanScreen,
  },
  {
    name: 'Discover the ingredients',
    icon: IngredientsIcon,
    screen: ProductScreen,
  },
  {
    name: 'Learn about Nova group',
    icon: DeviceTouchIcon,
    screen: NovaScreen,
  },
  {
    name: 'Determine your product Nutri-score',
    icon: DeviceTouchIcon,
    screen: NutriScreen,
  },
]

function ScanIcon(props) {
  return (
    <svg viewBox="0 0 490.343 490.343"  aria-hidden="true"  {...props}>
    <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
    <rect  fill="#A3A3A3" y="50.6" width="22.477" height="252.567"/>
    <rect  fill="#A3A3A3" x="58.787" y="50.6" width="22.477" height="252.567"/>
    <rect  fill="#A3A3A3" x="117.575" y="50.6" width="22.477" height="252.567"/>
    <path  fill="#A3A3A3" d="M477.759,368.26l-83.367-83.367c5.07-12.475,7.87-26.114,7.87-40.409c0-27.345-10.225-52.298-27.053-71.258V50.6h-22.477
      v103.394c-10.914-6.994-23.177-12.067-36.311-14.743V50.6h-22.477v86.497c-12.759,0.107-24.987,2.435-36.316,6.622V50.6H235.15
      v104.606c-15.381,10.307-27.946,24.484-36.311,41.137V50.6h-22.477v252.567h22.477v-10.542
      c17.652,35.14,54.019,59.258,96.023,59.258c14.3,0,27.943-2.802,40.421-7.874l83.358,83.363c12.328,12.328,38.915,20.202,59.118,0
      C500.877,404.253,486.776,376.308,477.759,368.26z M294.862,329.405c-46.901,0-84.922-38.021-84.922-84.922
      c0-46.901,38.021-84.922,84.922-84.922c46.901,0,84.922,38.021,84.922,84.922C379.784,291.384,341.763,329.405,294.862,329.405z
      M461.866,411.48c-7.293,7.293-20.024,7.309-27.333,0l-78.626-78.631c10.673-7.387,19.941-16.656,27.327-27.33l78.632,78.632
      C472.093,394.378,466.211,407.135,461.866,411.48z"/>
   </svg>
  )
}

function IngredientsIcon(props) {
  return (
    <svg  aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"  focusable="false" {...props}> <path fill="#A3A3A3" d="m16.2 11l4.1-6.5l1.7 1l-3.4 5.5h-2.4m-.6 1H2v3c0 3.9 3.1 7 7 7h6c3.9 0 7-3.1 7-7v-3h-6.4Z"/></svg>
  )
}

function DeviceTouchIcon(props) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={14}
          y1={14.5}
          x2={7}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#737373" />
          <stop offset={1} stopColor="#D4D4D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
        fill="#A3A3A3"
      />
      <path
        d="M7 22c0-4.694 3.5-8 8-8"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

const maxZIndex = 2147483647

const bodyVariantBackwards = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
}

const bodyVariantForwards = (custom) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const bodyAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
  },
}

function ScanScreen(props) {
  return (
    <AppScreen className="w-full rounded-xl">
      <MotionAppScreenBody 
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
        className=" "
      >  
         <div className=" rounded-xl ">        
          <video playsinline  autoPlay loop muted className="rounded-xl object-cover w-full h-auto md:h-[560px] lg:h-[600px] " >
          <source src="/video.mp4" type="video/mp4"/>
          </video>
         </div>       
      </MotionAppScreenBody>
    </AppScreen>
  )
} 

function ProductScreen(props) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
                <div className="mt-[-15px]">
                  <Image
                    src="/Screenshot-product.png"
                    alt="scanning screenshot"
                    width={320}
                    height={320}
                    className="rounded-xl"
                   
                  />
               
                </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function NovaScreen(props) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
         <div className="mt-[-15px]">
                  <Image
                    src="/Screenshot-nova.png"
                    alt="Nova group screenshot"
                    width={320}
                    height={320}
                    className="rounded-xl"
                   
                  />
                </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}
function NutriScreen(props) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
         <div className="mt-[-15px]">
                  <Image
                    src="/Screenshot-nutriscore.png"
                    alt="Nutri-score screenshot"
                    width={320}
                    height={320}
                    className="rounded-xl"
                   
                  />
                </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true },
  )

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left ui-not-focus-visible:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null,
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef(null)
  let slideRefs = useRef([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
          Nourish your body with knowledge. Scan the barcode, empower your choices.
          </h2>
          <p className="mt-2 text-lg text-gray-400">
          Healthy habits begin with informed choices. Discorer how can we help you.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
