import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from "next/image";
import Link from 'next/link';

export default function Nova({ onClose, novaGroup  }) {
  const [open, setOpen] = useState(true);
  const [novaOpen, setNovaOpen] = useState(false);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => setNovaOpen(false)}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6  ">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Image
                    src="/nova_1.png"
                    alt="nova group  1"
                    width={30}
                    height={30}
                    className="mx-auto"
                  />
                     <Image
                    src="/nova_2.png"
                    alt="nova group 2"
                    width={30}
                    height={30}
                    className="mx-auto"
                  />
                     <Image
                    src="/nova_3.png"
                    alt="nova group 3"
                    width={30}
                    height={30}
                    className="mx-auto"
                  />
                     <Image
                    src="/nova_4.png"
                    alt="nova group 4"
                    width={30}
                    height={30}
                    className="mx-auto"
                  />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Nova Group
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 text-left pb-2">
                      The NOVA classification assigns a group to food products based on how much processing they have been through 
                      </p>
                      <ul className='list-none text-sm text-gray-500 text-left'>
                        <li className={`mb-2 ${novaGroup === 1 ? 'bg-green-600 text-white p-1 rounded-md' : ''}`}> <span className='text-white bg-green-600 p-1 rounded-md'>Group 1</span> - Unprocessed or minimally processed foods</li>
                        <li className={`mb-2 ${novaGroup === 2 ? 'bg-yellow-400 text-white p-1 rounded-md' : ''}`}><span className='text-white bg-yellow-400 p-1 rounded-md'>Group 2</span> - Processed culinary ingredients</li>
                        <li className={`mb-2 ${novaGroup === 3 ? 'bg-orange-500 text-white p-1 rounded-md' : ''}`}><span className='text-white bg-orange-500 p-1 rounded-md'>Group 3</span> - Processed foods</li>
                        <li className={`mb-2 ${novaGroup === 4 ? 'bg-red-600 text-white p-1 rounded-md' : ''}`}><span className='text-white bg-red-600 p-1 rounded-md'>Group 4</span> - Ultra-processed food and drink products</li>
                        <li className={`mb-2 ${novaGroup === undefined ? 'bg-gray-400 text-white p-1 rounded-md' : ''}`}><span className='text-white bg-gray-400 p-1 pr-3 pl-3 rounded-md'>?</span> - No classification found </li>
                      </ul>
                      <Link href="https://world.openfoodfacts.org/nova" className="text-cyan-600">
                        More info
                      </Link>{' '}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onClose}
                  >
                    Go back 
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
