import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Settings({ limitHook, othersHook, orderedHook }) {
  const [limit, setLimit] = limitHook
  const [others, setOthers] = othersHook
  const [ordered, setOrdered] = orderedHook

  return (
    <div className="settings">
      <div className="flex items-center justify-start md:justify-between flex-wrap -space-x-px">
        <button
          type="button"
          disabled={limit <= 3}
          onClick={() => setLimit(limit - 3)}
          className="relative h-10 inline-flex items-center px-2 py-2 rounded-l-md
                          border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                          disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          <span className="sr-only">Previous</span>
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <span
          type="button"
          className="bg-white border-gray-300 text-gray-500
                        relative h-10 inline-flex items-center px-2 py-2 border text-sm font-medium"
        >
          {limit}
        </span>
        <button
          type="button"
          onClick={() => setLimit(limit + 3)}
          className="relative h-10 inline-flex items-center px-2 py-2 rounded-r-md
                          border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                          disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Results bioportal definition toggler */}
      <div
        className="flex items-center border border-gray-300 bg-white 
                    h-10 p-2 space-x-1 rounded"
      >
        <Switch.Group>
          <Switch.Label className="self-center w-min text-xs" passive>
            Definition
          </Switch.Label>
          <Switch
            checked={others}
            onChange={setOthers}
            className={`${
              others ? 'bg-orange-300' : 'bg-teal-400'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`transform transition ease-in-out duration-200 ${
                others ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </Switch.Group>
      </div>

      {/* Results default order toggler */}
      <div
        className="flex items-center border border-gray-300 bg-white 
                    h-10 p-2 space-x-1 rounded"
      >
        <Switch.Group>
          <Switch.Label className="self-center w-min text-xs" passive>
            Order
          </Switch.Label>
          <Switch
            checked={ordered}
            onChange={setOrdered}
            className={`${
              ordered ? 'bg-rose-400' : 'bg-blue-400'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`transform transition ease-in-out duration-200 ${
                ordered ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </Switch.Group>
      </div>
    </div>
  )
}
