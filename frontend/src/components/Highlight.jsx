import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Highlight({ header, text, verified, aka = [], headerClassnames, styling }) {
  return (
    <div className={`px-4 py-3 bg-white space-y-1 shadow rounded border-2 border-slate-300/60 ${styling}`}>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <h3 className={`capitalize tracking-wide text-slate-700 dark:text-slate-700 ${headerClassnames}`}>
                {header}
              </h3>
              <div className="self-center flex items-center justify-center space-x-2">
                {verified && text.match(/No.*found/) === null ? (
                  <>
                    <div
                      className={`px-1.5 py-0.5 text-xs lowercase rounded-xl border-2 bg-emerald-100 border-emerald-300/60 text-emerald-700`}
                    >
                      Verified
                    </div>
                  </>
                ) : null}
                <Disclosure.Button
                  className={`h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-100 hover:opacity-80 duration-150`}
                >
                  <ChevronUpIcon className={`w-4 h-4 text-slate-800 ${open ? 'transform rotate-180' : ''}`} />
                </Disclosure.Button>
                <span
                  className={`rounded-full ${text.match(/No.*found/) === null ? 'bg-blue-400' : 'bg-rose-400'} h-5 w-5`}
                ></span>
              </div>
            </div>
            <Transition
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="text-justify font-light text-gray-600 py-2 dark:text-white">
                {text}
                {aka.length !== 0 ? (
                  <footer className="mt-3 font-bold text-sm text-teal-600">
                    Also known as:{' '}
                    {aka.map((synonym, index) => (
                      <span className="font-light" key={`synonym-${index}`}>
                        {synonym}
                        {index !== aka.length - 1 ? ',' : null}{' '}
                      </span>
                    ))}
                  </footer>
                ) : null}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}
