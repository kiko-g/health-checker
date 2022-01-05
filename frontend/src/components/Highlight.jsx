import React from 'react'

export default function Highlight({ uri = 'uri', label = 'label', definition = '', index, classnames }) {
  return (
    <div className="p-3 shadow rounded-md bg-white space-y-1">
      <h3
        className={`capitalize tracking-wide text-bluegray-700 dark:text-white hover:text-blue-400 dark:hover:text-blue-200 duration-150 ${classnames}`}
      >
        {label}
      </h3>
      <p className="font-normal text-xs text-gray-500">{definition}</p>
    </div>
  )
}
