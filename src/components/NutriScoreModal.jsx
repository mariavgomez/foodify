import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from "next/image";
import Link from 'next/link';


export default function NutriScoreModal({ onClose }) {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center ">
                  <Image
                    src="/nutri_score-A.png"
                    alt="nutri-score A"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Nutri-Score
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      Nutri-Score is a grading system developed to help people make healthier food choices more easily.
                      </p>         
                      <ul className='list-none text-sm text-gray-500 text-left m-3'>
                        <li className='mb-2'> <span className='text-white bg-green-700 p-1 rounded-md'>A</span> - The most favorable choice and is presented in dark green</li>
                        <li className='mb-2'><span className='text-white bg-lime-600 p-1 rounded-md'>B</span> - Light green, meaning it’s still a favorable choice</li>
                        <li className='mb-2'><span className='text-white bg-yellow-400 p-1 rounded-md'>C</span> - A balanced choice and is yellow</li>
                        <li className='mb-2'><span className='text-white bg-orange-600 p-1 rounded-md'>D</span> - Less favorable and is orange</li>
                        <li className='mb-2'><span className='text-white bg-red-600 p-1 rounded-md'>E</span> -  The least favorable choice and is red</li>
                        <li className='mb-2 flex'> <Image
                    src="/nutriscore-unknown.svg"
                    alt="nutri-score unknown"
                    width={50}
                    height={50}
                    
                  /> - No score found </li>
                      </ul>
                       <p className="text-sm text-gray-500">Healthier choices and more favorable scores are associated with a higher content of fiber, proteins, fruits, and vegetables.
                        Saturated fats, added sugars, and salt all contribute to a less favorable score.</p>
                        <Link href="https://world.openfoodfacts.org/nutriscore" className="text-cyan-600">
                        More info
                      </Link>{' '}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
