import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Result({
  index,
  label,
  definition,
  detailed,
  exact,
  results,
  setOverviewActiveItem,
  setActiveView,
  others,
}) {
  return (
    <div className="relative p-3 shadow rounded-md bg-white dark:bg-slate-500 space-y-1">
      <Disclosure defaultOpen={index < 3}>
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setActiveView('overview')
                  if (others) setOverviewActiveItem(results.ordered[index])
                  else setOverviewActiveItem(results.detailed[index])
                }}
                className="capitalize font-medium text-sm tracking-wide duration-150
              text-slate-700 dark:text-white hover:text-teal-500 dark:hover:text-teal-300"
              >
                {label}
              </button>
              <div className="self-center flex items-center justify-center space-x-2">
                {exact ? (
                  <>
                    <div
                      className={`px-1.5 py-0.5 text-xs lowercase rounded-xl border-2 bg-purple-100 border-violet-300/60 text-slate-700`}
                    >
                      Exact match
                    </div>
                    <span className={`rounded-full ${exact ? 'bg-purple-400' : ''} h-5 w-5`}></span>
                  </>
                ) : null}
                {detailed ? (
                  <Disclosure.Button
                    className={`h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-100 hover:opacity-80 duration-150`}
                  >
                    <ChevronUpIcon className={`w-4 h-4 text-slate-800 ${open ? 'transform rotate-180' : ''}`} />
                  </Disclosure.Button>
                ) : null}
                <span className={`rounded-full ${detailed ? 'bg-teal-400' : 'bg-orange-300'} h-5 w-5`}></span>
              </div>
            </div>
            {detailed ? (
              <Transition
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="text-sm font-light text-gray-600 dark:text-white">
                  {definition}
                </Disclosure.Panel>
              </Transition>
            ) : null}
          </>
        )}
      </Disclosure>
    </div>
  )
}
